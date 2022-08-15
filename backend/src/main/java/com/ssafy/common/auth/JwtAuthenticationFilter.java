package com.ssafy.common.auth;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.common.exception.JwtTokenException;
import com.ssafy.common.exception.ReIssuanceAccessTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.ResponseBodyWriteUtil;
import com.ssafy.db.entity.User;

/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    private final UserService userService;

    private final RedisTemplate<String, Object> redisTemplate;


    // AuthenticationManager가 인증서들을 관리한다.
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, RedisTemplate<String, Object> redisTemplate) {
        super(authenticationManager);
        this.userService = userService;
        this.redisTemplate = redisTemplate;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // filterChain.doFilter 라는 것은 다음 필터가 있으면 다음 필터를 호출하고, 없으면 서블릿을 호출한다.
        // Read the Authorization header, where the JWT Token should be

        // header랑 상관없이 일단 로그인과 회원가입의 경우라면 이 필터는 사용하지 않는다.
        String path = request.getRequestURI();
        if (path.contains("/login")) {
            // 로그인
            filterChain.doFilter(request, response);
            return;
        } else if (request.getMethod().equals("POST") && path.contains("/users/register")) {
            // 회원가입
            filterChain.doFilter(request, response);
            return;
        } else if(request.getMethod().equals("POST") && path.contains("/check")){
            filterChain.doFilter(request, response);
            return;
        }
        else if (path.contains("/ws")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("==============doFilterINternal===================");
        String header1 = request.getHeader(JwtTokenUtil.HEADER_STRING);
        String header2 = request.getHeader(JwtTokenUtil.HEADER_STRING_REFRESH);

        System.out.println(header1);
        System.out.println(header2);

        // If header does not contain BEARER or is null delegate to Spring impl and exit
        if (header1 == null || !header1.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
            response.sendError(401, "login needed");
            return;
        }

        try {
            // If header is present, try grab user principal from database and perform authorization
            Authentication authentication = getAuthentication(request, response);
            System.out.println("authentication done");
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            // SecurityContextHolder를 가지고 authentication을 가져와서 이용 가능
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (ReIssuanceAccessTokenException ex) {
            System.out.println("인가 토큰 재발급");
//            filterChain.doFilter(request, response);
            return;
        } catch (JwtTokenException ex) {
            ex.printStackTrace();
            response.sendError(401, "login needed");
            return;
        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request, response, ex);
            return;
        }

        filterChain.doFilter(request, response);
        System.out.println("=========================================");
    }

    @Transactional()
    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("======getAuthentication=========");
        String accessToken = request.getHeader(JwtTokenUtil.HEADER_STRING);
        String refreshToken = request.getHeader(JwtTokenUtil.HEADER_STRING_REFRESH);
        System.out.println(accessToken);
        System.out.println(refreshToken);
        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.
        if(accessToken == null || refreshToken == null) throw new JwtTokenException("no accessToken");
        // parse the token and validate it (decode)
        JWTVerifier verifier = JwtTokenUtil.getAccessTokenVerifier();
        JWTVerifier verifierRefresh = JwtTokenUtil.getRefreshTokenVerifier();
        // 먼저 accessToken이 null이 아니므로 있다는 것인데 그러면 redis에 이 토큰이 실제로
        // 있는 지 체크 후에 validation 진행


        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();

        try {
            DecodedJWT decodedJWT = verifier.verify(accessToken.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            String userId = decodedJWT.getSubject();
            if (userId == null) throw new JwtTokenException("no userId");
            String redisAccessToken = hashOperations.get(userId, "accessToken");
            String redisRefreshToken = hashOperations.get(userId, "refreshToken");
            if (!accessToken.replace(JwtTokenUtil.TOKEN_PREFIX,"").equals(redisAccessToken) || !refreshToken.replace(JwtTokenUtil.TOKEN_PREFIX, "").equals(redisRefreshToken)) {
                // redis에서 가져온 토큰들이 없거나
                // 두 개의 토큰중 안맞는 토큰이 있으므로 둘 다 만료 시키고 401로 로그인을 다시하라고 알리기
                System.out.println(accessToken);
                System.out.println(refreshToken);
                System.out.println(redisAccessToken);
                System.out.println(redisRefreshToken);
                hashOperations.delete(userId, "accessToken", "refreshToken");
                throw new JwtTokenException("thats not exact token");
            }
            JwtTokenUtil.accessHandleError(accessToken); // 이곳에서 토큰 만료 여부가 체크됨

            // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            User user = userService.getUserByUserId(userId);
            if (user == null) throw new JwtTokenException("no user. register needed");
            // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
            // 정상 유저이므로 user 객체를 userDetails에 넣어준다.
            // 이 details에는 user와 여러 인증에 관한 것들이 들어있다.
            SsafyUserDetails userDetails = new SsafyUserDetails(user);
            UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userId,
                    null, userDetails.getAuthorities());
            jwtAuthentication.setDetails(userDetails);
            return jwtAuthentication;
        } catch (TokenExpiredException e) { // accessToken time expired
            System.out.println("accessToken expired");
            // refresh token도 만료되었는지 확인
            // 그 다음에 validation check
            try { // refreshToken으로 확인
                JwtTokenUtil.refreshHandleError(refreshToken);
                System.out.println("refresh alive ");

                DecodedJWT decodedJWTRefresh = verifierRefresh.verify(refreshToken.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
                String userId = decodedJWTRefresh.getSubject();
                if (userId == null) throw new JwtTokenException("no userId");

                // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
                User user = userService.getUserByUserId(userId);
                if(user == null) throw new JwtTokenException("no user");

                // 인증이 다 되었다는 뜻
                String newAccessToken = JwtTokenUtil.getAccessToken(userId);
                System.out.println(newAccessToken);
                hashOperations.delete(userId, "accessToken");
                hashOperations.put(userId, "accessToken", newAccessToken);
//                PrintWriter out = response.getWriter();
//                // 이부분 하기
//                out.print(new ObjectMapper().writeValueAsString(newAccessToken));
//                out.flush();
//                out.close();
                response.setHeader("Authorization", newAccessToken);
                response.setStatus(405);
                throw new ReIssuanceAccessTokenException("인가토큰 재발급");

            } catch (TokenExpiredException ex) {
                // refreshToken도 만료되었으므로 로그인하도록 리턴
                System.out.println("refreshToken expired too so login again");
                throw new JwtTokenException("refreshToken expired");
            }
            // refreshToken이 검증이 되었다면 다시 accessToken을 만들어서 redis에 저장하고
            // 사용자에게 재발급 받은 accessToken을 보내준다.
        }

    }

}
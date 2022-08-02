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
import com.ssafy.common.exception.ReIssuanceAccessTokenException;
import com.ssafy.db.entity.OAuth;
import com.ssafy.db.repository.OAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.filter.OncePerRequestFilter;

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

    private final OAuthRepository oAuthRepository;

    // AuthenticationManager가 인증서들을 관리한다.
	public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService, OAuthRepository oAuthRepository) {
		super(authenticationManager);
		this.userService = userService;
        this.oAuthRepository = oAuthRepository;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
        // filterChain.doFilter 라는 것은 다음 필터가 있으면 다음 필터를 호출하고, 없으면 서블릿을 호출한다.
        System.out.println("doFilterInternal");
		// Read the Authorization header, where the JWT Token should be
        String header = request.getHeader(JwtTokenUtil.HEADER_STRING);
        System.out.println(header);

        // If header does not contain BEARER or is null delegate to Spring impl and exit
        if (header == null || !header.startsWith(JwtTokenUtil.TOKEN_PREFIX)) {
            // token이 없으므로 로그인과 회원가입의 경우는 그냥 진행하고
            // 나머지의 경우에 대해서는 response에 값을 넣어서 로그인하라고 명령
            String path = request.getRequestURI();
            if(path.contains("/login")) {
                // 로그인
                filterChain.doFilter(request, response);
            } else if(request.getMethod().equals("POST") && path.contains("/users")){
                // 회원가입
                filterChain.doFilter(request, response);
            } else{
                response.sendError(401, "accessToken needed");
            }
            // 이렇게 하면 이상하게 swagger-ui에서 에러남
            // 그 이유가 spring-security랑 겹쳐서 충돌나서 그런 것이다.
            return;
        }
        
        try {
            // If header is present, try grab user principal from database and perform authorization
            Authentication authentication = getAuthentication(request, response);
            // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (ReIssuanceAccessTokenException ex){
            return;
        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request, response, ex);
            return;
        }
        
        filterChain.doFilter(request, response);
	}
	
	@Transactional()
    public Authentication getAuthentication(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        OAuth oAuth = null;
        boolean newAccessToken = false;
        System.out.println("test1");
        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.
        if (token != null) {
            // parse the token and validate it (decode)
            JWTVerifier verifier = JwtTokenUtil.getAccessTokenVerifier();
            System.out.println("test2");

            try {
                JwtTokenUtil.accessHandleError(token); // 이곳에서 토큰 만료 여부가 체크됨
                System.out.println("test2");

            } catch (TokenExpiredException e){ // accessToken time expired
                System.out.println("expired");
                // refresh token도 만료되었는지 확인
                // redis에는 accessToken과 refreshToken이 키:밸류로 저장됨
                // 따라서 redis에서 accessToken을 키로 가지고 가서 refreshToken을 가지고 온다.
                // 그 다음에 validation check
                oAuth = oAuthRepository.findOne(token);
                JwtTokenUtil.refreshHandleError(oAuth.getRefreshToken());
                // refreshToken이 검증이 되었다면 다시 accessToken을 만들어서 redis에 저장하고
                // 사용자에게 재발급 받은 accessToken을 보내준다.
                newAccessToken = true;

            }
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            String userId = decodedJWT.getSubject();
            System.out.println("test3");


            // Search in the DB if we find the user by token subject (username)
            // If so, then grab user details and create spring auth token using username, pass, authorities/roles
            if (userId != null) {
                    // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            		User user = userService.getUserByUserId(userId);
                if(user != null) {
                    if(newAccessToken){ // 인증은 다 되었으므로 accessToken 새로 만들어서 보내기
                        response.setHeader("accessToken", JwtTokenUtil.getAccessToken(userId));
                        oAuthRepository.update(oAuth);
                        throw new ReIssuanceAccessTokenException("인가토큰 재발급");
                    }
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                    // 정상 유저이므로 user 객체를 userDetails에 넣어준다.
                    // 이 details에는 user와 여러 인증에 관한 것들이 들어있다.
                    SsafyUserDetails userDetails = new SsafyUserDetails(user);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(userId,
                            null, userDetails.getAuthorities());
                    jwtAuthentication.setDetails(userDetails);
                    return jwtAuthentication;
                }
            }
            return null;
        }
        return null;
    }
}

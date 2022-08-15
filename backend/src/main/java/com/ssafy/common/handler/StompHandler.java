package com.ssafy.common.handler;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.exception.JwtTokenException;
import com.ssafy.common.exception.ReIssuanceAccessTokenException;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Objects;

@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    @Autowired
    private final RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private final UserService userService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT) {
            if(!authentication(message, accessor)) throw new MessagingException("401");
            else return message;
        }
        return message;
    }

    private Boolean authentication(Message<?> message, StompHeaderAccessor accessor){

        System.out.println("full message:" + message);
        String accessToken = null;
        String refreshToken = null;
        try{
            accessToken = Objects.requireNonNull(accessor.getNativeHeader("Authorization")).get(0);
            refreshToken = Objects.requireNonNull(accessor.getNativeHeader("Authorization2")).get(0);
            System.out.println(accessToken);
            System.out.println(refreshToken);

        } catch (NullPointerException e){
            return false;
        }

        if(!accessToken.startsWith(JwtTokenUtil.TOKEN_PREFIX)){
            return false;
        }

        JWTVerifier verifier = JwtTokenUtil.getAccessTokenVerifier();
        JWTVerifier verifierRefresh = JwtTokenUtil.getRefreshTokenVerifier();

        HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
        DecodedJWT decodedJWT = verifier.verify(accessToken.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
        String userId = decodedJWT.getSubject();
        if (userId == null) return false;
        String redisAccessToken = hashOperations.get(userId, "accessToken");
        String redisRefreshToken = hashOperations.get(userId, "refreshToken");
        if (!accessToken.replace(JwtTokenUtil.TOKEN_PREFIX, "").equals(redisAccessToken) || !refreshToken.replace(JwtTokenUtil.TOKEN_PREFIX, "").equals(redisRefreshToken)) {
            // redis에서 가져온 토큰들이 없거나
            // 두 개의 토큰중 안맞는 토큰이 있으므로 둘 다 만료 시키고 401로 로그인을 다시하라고 알리기
            hashOperations.delete(userId, "accessToken", "refreshToken");
            return false;
        }

        User user = userService.getUserByUserId(userId);
        return user != null;
    }
}

package com.ssafy.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import static com.google.common.collect.Lists.newArrayList;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    private static String accessSecretKey;
    private static String refreshSecretKey;
    private static Integer accessExpirationTime;
    private static Integer refreshExpirationTime;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String HEADER_STRING_REFRESH = "Authorization2";
    public static final String ISSUER = "ssafy.com";
    
    @Autowired
	public JwtTokenUtil(@Value("${jwt.secret}") String accessSecretKey,@Value("${jwt.refreshsecret}") String refreshSecretKey, @Value("${jwt.expiration}") Integer accessExpirationTime, @Value("${jwt.refreshexpiration}") Integer refreshExpirationTime) {
		JwtTokenUtil.accessSecretKey = accessSecretKey;
        JwtTokenUtil.refreshSecretKey = refreshSecretKey;
		JwtTokenUtil.accessExpirationTime = accessExpirationTime;
        JwtTokenUtil.refreshExpirationTime = refreshExpirationTime;
	}

	public static JWTVerifier getAccessTokenVerifier() {
        return JWT
                .require(Algorithm.HMAC512(accessSecretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static JWTVerifier getRefreshTokenVerifier(){
        return JWT
                .require(Algorithm.HMAC512(refreshSecretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    // 로그인 시도할 때, 이 메서드를 사용
    public static String getAccessToken(String userId) {
        Date accessExpires = JwtTokenUtil.getTokenExpiration(accessExpirationTime); // 만료 시간 세팅
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(accessExpires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(accessSecretKey.getBytes())); // jwt 생성
    }

    public static String getRefreshToken(String userId){

        Date refreshExpires = JwtTokenUtil.getTokenExpiration(refreshExpirationTime); // 만료 15일
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(refreshExpires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(refreshSecretKey.getBytes()));
    }

    public static Date getTokenExpiration(int expirationTime) {
    		Date now = new Date();
    		return new Date(now.getTime() + expirationTime);
    }

    public static void accessHandleError(String token) throws Exception {
        System.out.println("accessHandler on");
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(accessSecretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (InvalidClaimException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (SignatureGenerationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (SignatureVerificationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (TokenExpiredException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (JWTCreationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (JWTDecodeException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (JWTVerificationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
    }

    public static void refreshHandleError(String token) throws Exception{
        System.out.println("refreshHandleError");
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(refreshSecretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (InvalidClaimException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (SignatureGenerationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (SignatureVerificationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (TokenExpiredException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (JWTCreationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (JWTDecodeException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (JWTVerificationException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}

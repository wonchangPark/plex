package com.ssafy.api.controller;

import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.repository.OAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	UserService userService;

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	@Autowired
	OAuthRepository oAuthRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getId();
		String password = loginInfo.getPassword();
		System.out.println("login start");
		
		User user = userService.getUserByUserId(userId);
		if(user == null) {
			System.out.println("user == null == 401 error");
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Not Registered",null, null, null));
		}
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getPassword())) {
			System.out.println("password in");
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			String accessToken = JwtTokenUtil.getAccessToken(userId);
			String refreshToken = JwtTokenUtil.getRefreshToken(userId); // 이 정보는 userId와 키밸류로 레디스에 들어갈 것.
			System.out.println(accessToken+ " "+refreshToken);

			// redis에 accessToken, refreshToken 저장하기
			HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
			hashOperations.put(userId, "accessToken",accessToken);
			hashOperations.put(userId, "refreshToken",refreshToken);
			System.out.println(hashOperations.get(userId, "accessToken"));
			System.out.println(hashOperations.get(userId, "refreshToken"));


//			OAuth oAuth = new OAuth(userId, accessToken, refreshToken); // db에 저장
//			System.out.println("oAuth : "+oAuth);
//			oAuthRepository.save(oAuth);

			// redis 로 바꿀 때 사용

			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", user, accessToken, refreshToken));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password",null, null, null));
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logout(){
		SsafyUserDetails userDetails = (SsafyUserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
		User user = userDetails.getUser();
		HashOperations<String, String, String> hashOperations = redisTemplate.opsForHash();
		hashOperations.delete(user.getUserId(), "accessToken", "refreshToken");
		return ResponseEntity.status(200).build();
	}

}

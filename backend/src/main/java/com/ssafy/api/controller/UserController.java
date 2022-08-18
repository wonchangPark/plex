package com.ssafy.api.controller;

import com.ssafy.api.request.ImgPostReq;
import com.ssafy.api.response.UserExerciseRes;
import com.ssafy.api.response.UserInfoRes;
import com.ssafy.api.response.UserTotalGameCntRes;
import com.ssafy.common.exception.UserDuplicateException;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
public class UserController {
	@Autowired
	UserRepository userRepository;
	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 중복"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		try {
			userService.createUser(registerInfo);
		} catch (UserDuplicateException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Duplicated"));
		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}


	@PostMapping("/nickname/check")
	@ApiOperation(value = "닉네임 중복 확인", notes = "가입되어 있는 회원 정보들 중 중복되는 닉네임이 있는지 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> validateCheckUserNick(
			@RequestBody @ApiParam(value="닉네임 정보", required = true) UserRegisterPostReq registerInfo) {
		User user = userRepository.findByUserNick(registerInfo.getNick());
		if (user != null) {
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Duplicated"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@PostMapping("/id/check")
	@ApiOperation(value = "아이디 중복 확인", notes = "가입되어 있는 회원 정보들 중 중복되는 아이디가 있는지 확인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> validateCheckUserId(
			@RequestBody @ApiParam(value="닉네임 정보", required = true) UserRegisterPostReq registerInfo){
		User user = userRepository.findByUserId(registerInfo.getId());
		if (user != null) {
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Duplicated"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		if(user == null){
			return ResponseEntity.status(404).body(BaseResponseBody.of(404, "noUserInfo"));
		}
		
		return ResponseEntity.status(200).body(UserRes.of(200, "Success", user));
	}

//	@GetMapping("/ranking")
//	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
//	@ApiResponses({
//			@ApiResponse(code = 200, message = "성공"),
//			@ApiResponse(code = 401, message = "인증 실패"),
//			@ApiResponse(code = 404, message = "사용자 없음"),
//			@ApiResponse(code = 500, message = "서버 오류")
//	})
//	public ResponseEntity<List<User>> getRankerList(){
//		return ResponseEntity.ok(userService.getRankingList());
//	}

	@GetMapping("/image")
	public ResponseEntity<UserInfoRes> getUserImage(@RequestParam String nick){
		UserInfoRes userInfoRes = userService.getUserByUserNick(nick);
		return ResponseEntity.status(200).body(userInfoRes);

	}

	@PostMapping("/image")
	public void setMyImage(@RequestBody(required = false)ImgPostReq imgInfo){
		SsafyUserDetails details = (SsafyUserDetails)(SecurityContextHolder.getContext().getAuthentication().getDetails());
		User user = details.getUser();
		userService.setMyImage(user, imgInfo.getImage());
	}

	@GetMapping("/exercise")
	public ResponseEntity<List<UserExerciseRes>> getMyTotalExcercise(){
		SsafyUserDetails details = (SsafyUserDetails)(SecurityContextHolder.getContext().getAuthentication().getDetails());
		User user = details.getUser();
		List<UserExerciseRes> list = userService.getMyTotalExercise(user);
		return ResponseEntity.status(200).body(list);
	}

	@GetMapping("/totalgame")
	public ResponseEntity<UserTotalGameCntRes> getMyTotalGameCnt(){
		SsafyUserDetails details = (SsafyUserDetails)(SecurityContextHolder.getContext().getAuthentication().getDetails());
		User user = details.getUser();
		UserTotalGameCntRes userTotalGameCntRes = userService.getMyTotalGameCnt(user);
		return ResponseEntity.status(200).body(userTotalGameCntRes);
	}


}

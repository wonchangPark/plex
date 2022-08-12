package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody{
	@NotNull
	private Long no;
	@ApiModelProperty(name="user_id", example="ssafy")
	String userId;
	@ApiModelProperty(name="user_nick", example="병아리뿅뿅")
	String nick;
	@ApiModelProperty(name="user_email", example="ssafy@naver.com")
	String email;
	@ApiModelProperty(name="user_img", example="@/assets/aaa.png")
	String img;
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	String refreshToken;

	public static UserLoginPostRes of(Integer statusCode, String message, User user, String accessToken, String refreshToken) {
		UserLoginPostRes res = new UserLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setNo(user.getNo());
		res.setUserId(user.getUserId());
		res.setNick(user.getNick());
		res.setEmail(user.getEmail());
		res.setImg(user.getImg());
		res.setAccessToken(accessToken);
		res.setRefreshToken(refreshToken);
		return res;
	}
}

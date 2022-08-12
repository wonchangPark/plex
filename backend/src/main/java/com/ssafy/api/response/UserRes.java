package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes extends BaseResponseBody{
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
	
	public static UserRes of(Integer statusCode, String message, User user) {
		UserRes res = new UserRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setNo(user.getNo());
		res.setUserId(user.getUserId());
		res.setNick(user.getNick());
		res.setEmail(user.getEmail());
		res.setImg(user.getImg());
		return res;
	}
}

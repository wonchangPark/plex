package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 정보 관련 API 
 * ([GET] /api/v1/users/<string:userId)
 * ([PATCH] /api/v1/users/<string:userId)
 * ([DElETE] /api/v1/users/<string:userId)
 * 요청에 대한 응답값 정의.
 */

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoRes extends BaseResponseBody{
	public static UserInfoRes of(Integer statusCode, String message) {
		UserInfoRes res = new UserInfoRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		return res;
	}
}

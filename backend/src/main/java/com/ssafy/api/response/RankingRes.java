package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/ranking) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("RankingResponse")
public class RankingRes extends BaseResponseBody{
	@ApiModelProperty(name="User Nickname")
	private String userNick;
	private Long userTotalScore;
	
	public static RankingRes of(User user) {
		RankingRes res = new RankingRes();
		res.setUserNick(user.getNick());
		res.setUserTotalScore(user.getTotalScore());
		return res;
	}
}

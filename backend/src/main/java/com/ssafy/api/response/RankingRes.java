package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/ranker) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
public class RankingRes implements Comparable<RankingRes>{
	private Long userNo;
	private String userNick;

	private String userImage;

	private Long score;
	private Long rank;


	public RankingRes() {
	}

	public RankingRes(Long userNo, String userNick, Long score, Long rank) {
		this.userNo = userNo;
		this.userNick = userNick;
		this.score = score;
		this.rank = rank;
	}

	public RankingRes(Long userNo, String userNick, Long score) {
		this.userNo = userNo;
		this.userNick = userNick;
		this.score = score;
	}

	public RankingRes(Long userNo, String userNick, String userImage, Long score, Long rank) {
		this.userNo = userNo;
		this.userNick = userNick;
		this.userImage = userImage;
		this.score = score;
		this.rank = rank;
	}

	@Override
	public int compareTo(RankingRes o) {
		if(Objects.equals(this.userNo, o.userNo)) return 0;
		return 1;
	}
}

package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserTotalGameCntRes {

    Long totalCnt;
    Long winCnt;
    Long loseCnt;

    public UserTotalGameCntRes(Long totalCnt, Long winCnt, Long loseCnt) {
        this.totalCnt = totalCnt;
        this.winCnt = winCnt;
        this.loseCnt = loseCnt;
    }
}

package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ScoreHistoryPostReq {
    long exerciseNum;
    long gameNo;
    long score;
    int teamNo;
    boolean win;
    long gameHistoryNo;
    long userNo;
    long roomNo;
}

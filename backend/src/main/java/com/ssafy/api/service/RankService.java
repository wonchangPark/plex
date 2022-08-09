package com.ssafy.api.service;

import com.ssafy.api.response.RankingRes;

import java.util.List;

public interface RankService {

    List<RankingRes> getRankList();
    RankingRes getMyRank(Long userNo);
}

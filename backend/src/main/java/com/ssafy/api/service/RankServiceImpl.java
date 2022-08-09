package com.ssafy.api.service;

import com.ssafy.api.response.RankingRes;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RankRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service("rankService")
public class RankServiceImpl implements RankService{

    @Autowired
    RankRepository rankRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<RankingRes> getRankList() {
        return rankRepository.getRankList();
    }

    @Override
    @Transactional
    public RankingRes getMyRank(Long userNo) {
        List<RankingRes> list = getRankList();
        RankingRes temp = new RankingRes();
        temp.setUserNo(userNo);
        return list.get(list.indexOf(temp));
    }
}

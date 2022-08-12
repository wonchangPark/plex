package com.ssafy.api.service;

import com.ssafy.api.response.RankingRes;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.JdbcTemplateRepository;
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
    JdbcTemplateRepository jdbcTemplateRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<RankingRes> getRankList() {
//        return rankRepository.getRankList();
        return jdbcTemplateRepository.getRankList();
    }

    @Override
    public RankingRes getMyRank(Long userNo) {
        return jdbcTemplateRepository.getMyRank(userNo);
    }
}

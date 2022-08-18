package com.ssafy.api.controller;

import com.ssafy.api.response.RankingRes;
import com.ssafy.api.service.RankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/rank")
@CrossOrigin("*")
public class RankController {

    @Autowired
    RankService rankService;

    @GetMapping
    public ResponseEntity<List<RankingRes>> getAllRank(){
        return ResponseEntity.ok(rankService.getRankList());
    }

    @GetMapping("/{no}")
    public ResponseEntity<RankingRes> getMyRank(@PathVariable("no") long userNo){
        return ResponseEntity.ok(rankService.getMyRank(userNo));
    }


}

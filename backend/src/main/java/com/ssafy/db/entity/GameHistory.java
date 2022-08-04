package com.ssafy.db.entity;

import lombok.Cleanup;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
public class GameHistory {

    @Id @GeneratedValue
    @Column(name = "gamehistory_no")
    private Long no;

    @Column(name = "gamehistory_starttime")
    @NotNull
    private LocalDateTime startTime;

    @Column(name = "gamehistory_endtime")
    private LocalDateTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_no")
    private Room room;

    @NotNull
    @Column(name = "gamecategory_no")
    private Long gamecategoryNo; // 연관관계를 설정하지 않았으므로 더 신경써서 카테고리에 있는지 확인후 세팅할 것.

    protected GameHistory(){}
    protected GameHistory(Room room, Long gamecategoryNo){
        this.room = room;
        this.gamecategoryNo = gamecategoryNo;
    }

    public static GameHistory createGameHistory(Room room, Long gamecategoryNo){
        return new GameHistory(room, gamecategoryNo);
    }

}

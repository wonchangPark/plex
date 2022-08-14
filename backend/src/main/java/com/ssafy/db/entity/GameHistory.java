package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
public class GameHistory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    protected GameHistory(){}
    protected GameHistory(Room room){
        this.startTime = LocalDateTime.now();
        this.room = room;
    }

    public static GameHistory createGameHistory(Room room){
        return new GameHistory(room);
    }

}

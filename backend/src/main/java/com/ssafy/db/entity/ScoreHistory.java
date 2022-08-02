package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ScoreHistory {

    @Id @GeneratedValue
    @Column(name = "scorehistory_no")
    private Long no;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name = "gamehistory_no")
    private GameHistory gameHistory;

    @Column(name = "gamehistory_score")
    private Long score;

    @Column(name = "gamehistory_teamno")
    private int teamNo;

    protected ScoreHistory(){}
    protected ScoreHistory(User user, GameHistory gameHistory, Long score, int teamNo){
        this.user = user;
        this.gameHistory = gameHistory;
        this.score = score;
        this.teamNo = teamNo;
    }

    public static ScoreHistory createScoreHistory(User user, GameHistory gameHistory, Long score, int teamNo){
        return new ScoreHistory(user, gameHistory, score, teamNo);
    }
}
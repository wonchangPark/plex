package com.ssafy.db.entity;

import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
public class ScoreHistory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scorehistory_no")
    private Long no;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne
    @JoinColumn(name = "gamehistory_no")
    private GameHistory gameHistory;

    @Column(name = "scorehistory_score")
    @ColumnDefault("0")
    private Long score;

    @Column(name = "scorehistory_teamno")
    @NotNull
    private int teamNo;

    @Column(name = "scorehistory_win")
    private Boolean win;

    @Column(name = "scorehistory_exercisenum")
    private Long exerciseNum;

    @Column(name = "game_no")
    @NotNull
    private Long gameNo;

    protected ScoreHistory(){}
    protected ScoreHistory(User user, GameHistory gameHistory, Long score, int teamNo, Boolean win, Long exerciseNum, Long gameNo){
        this.user = user;
        this.gameHistory = gameHistory;
        this.score = score;
        this.teamNo = teamNo;
        this.win = win;
        this.exerciseNum = exerciseNum;
        this.gameNo = gameNo;
    }

    public static ScoreHistory createScoreHistory(User user, GameHistory gameHistory, Long score, int teamNo, Boolean win, Long exerciseNum, Long gameNo){
        return new ScoreHistory(user, gameHistory, score, teamNo, win, exerciseNum, gameNo);
    }
}

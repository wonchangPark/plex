package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserExerciseRes {

    Integer gamecategoryType;
    String gamecategoryName;
    Long score;

    public UserExerciseRes(Integer gamecategoryType, String gamecategoryName, Long score) {
        this.gamecategoryType = gamecategoryType;
        this.gamecategoryName = gamecategoryName;
        this.score = score;
    }
}

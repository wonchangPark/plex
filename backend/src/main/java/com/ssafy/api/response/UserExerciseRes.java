package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserExerciseRes {

    Integer gamecategoryType;
    String gamecategoryName;
    Long cnt;

    public UserExerciseRes(Integer gamecategoryType, String gamecategoryName, Long cnt) {
        this.gamecategoryType = gamecategoryType;
        this.gamecategoryName = gamecategoryName;
        this.cnt = cnt;
    }
}

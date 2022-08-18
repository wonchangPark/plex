package com.ssafy.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserVo {
    private String userId;
    private String nick;
    private int team;
    private boolean host;
    private String img;
    private String content;
}

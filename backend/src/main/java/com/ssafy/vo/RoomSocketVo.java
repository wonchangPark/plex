package com.ssafy.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoomSocketVo {
    private String type;
    private String roomId;
    private UserVo user;
    private int gameType;

    private List<UserVo> users;
}

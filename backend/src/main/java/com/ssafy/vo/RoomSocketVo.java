package com.ssafy.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoomSocketVo {
    private String type;
    private String userName;
    private String roomId;
    private String content;
}

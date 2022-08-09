package com.ssafy.api.response;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


@Data
public class RoomInfoRes {

    @NotNull
    private Long no;
    @NotNull
    private String host;
    @NotNull
    private String code;
    @NotNull
    private String name;
    @NotNull
    private Integer roomSize;
    private Integer gameNo;
    @NotNull
    private LocalDateTime startTime;
    private Long userCount;

    boolean isVisible;

    public RoomInfoRes(Long no,String host, String code, String name, Integer roomSize, Integer gameNo, LocalDateTime startTime, Long userCount) {
        this.no = no;
        this.host = host;
        this.code = code;
        this.name = name;
        this.roomSize = roomSize;
        this.gameNo = gameNo;
        this.startTime = startTime;
        this.userCount = userCount;
        isVisible = true;
    }
}

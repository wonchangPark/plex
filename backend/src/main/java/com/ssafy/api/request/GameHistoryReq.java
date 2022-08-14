package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class GameHistoryReq {

    private Long roomNo;
    private LocalDateTime startTime;

}

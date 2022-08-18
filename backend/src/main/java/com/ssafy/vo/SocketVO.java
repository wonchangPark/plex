package com.ssafy.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SocketVO {
    private String userName;
    private String content;
    private String type;
    private String img;
}

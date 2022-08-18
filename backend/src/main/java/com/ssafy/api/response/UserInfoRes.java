package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoRes {
    private Long userNo;
    private String userImage;

    public UserInfoRes() {
    }

    public UserInfoRes(Long userNo, String userImage) {
        this.userNo = userNo;
        this.userImage = userImage;
    }
}

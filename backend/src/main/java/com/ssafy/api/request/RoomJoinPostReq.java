package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomJoinPostRequest")
public class RoomJoinPostReq {
    @ApiModelProperty(name="방 코드", example="ncLGyqAsAn")
    String code;
    @ApiModelProperty(name="참가자 id", example="ssafy")
    String id;
}

package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("RoomCreatePostRequest")
public class RoomCreatePostReq {
    @ApiModelProperty(name="방 이름", example="ssafy_web")
    String name;
    @ApiModelProperty(name="방 Host", example="ssafy")
    String host;
    @ApiModelProperty(name="방 인원", example="6")
    Integer roomSize;
    @ApiModelProperty(name="게임 종류", example="1")
    Integer gameNo;
    @ApiModelProperty(name="비공개 여부", example="true")
    Boolean isPrivate;
}

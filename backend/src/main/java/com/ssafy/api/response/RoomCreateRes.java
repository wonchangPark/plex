package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("RoomCreateResponse")
public class RoomCreateRes extends BaseResponseBody {
    @NotNull
    private Long no;
    @ApiModelProperty(name="방 이름", example="ssafy_web")
    String name;
    @ApiModelProperty(name="방 Code", example="slkjdejioa")
    String code;
    @ApiModelProperty(name="방 Host", example="ssafy")
    String host;
    @ApiModelProperty(name="방 인원", example="6")
    Integer roomSize;

    private Integer gameNo;
    private Boolean isPrivate;
    @ApiModelProperty(name="OpenVidu 방 token", example="ses_sdlkfjaioeaf")
    String token;



    public static RoomCreateRes of(Integer statusCode, String message, Room room, String token) {
        RoomCreateRes res = new RoomCreateRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setName(room.getName());
        res.setCode(room.getCode());
        res.setHost(room.getHost());
        res.setRoomSize(room.getRoomSize());
        res.setToken(token);
        return res;
    }
}

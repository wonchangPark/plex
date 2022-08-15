package com.ssafy.api.controller;

import com.ssafy.api.request.RoomJoinPostReq;
import com.ssafy.api.response.RoomCreateRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.RoomUserService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import com.ssafy.vo.RoomSocketVo;
import com.ssafy.vo.SocketVO;
import com.ssafy.vo.UserSetVo;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/ws")
public class ChatController {
    HashSet<UserSetVo> userSet = new HashSet<>();

    private final SimpMessagingTemplate template;

    @Autowired
    private RoomService roomService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoomUserService roomUserService;

    @MessageMapping("/receive")
    @SendTo("/send")
    public SocketVO SocketHandler(SocketVO socketVo){
        String userName = socketVo.getUserName();
        String type = socketVo.getType();
        if(type.equals("enter")){
            userSet.add(new UserSetVo(socketVo.getUserName(), socketVo.getImg()));
        }else if(type.equals("exit")) {
            userSet.removeIf(userSetVo -> userSetVo.getNick().equals(userName));
        }else {
            userSet.add(new UserSetVo(socketVo.getUserName(), socketVo.getImg()));
        }
        return socketVo;
    }

    @MessageMapping("/room")
    public void roomSocketHandler(RoomSocketVo socketVo){
        if(socketVo.getType().equals("Leave") || socketVo.getType().equals("LeaveHost")){
            RoomJoinPostReq joinInfo = new RoomJoinPostReq();
            joinInfo.setCode(socketVo.getRoomId());
            joinInfo.setId(socketVo.getUser().getNick());
            leaveRoom(joinInfo);
        };
        template.convertAndSend("/send/"+socketVo.getRoomId(), socketVo);
    }

    @RequestMapping("/users")
    @ResponseBody
    public List<UserSetVo> getUserList(){
        return new ArrayList<>(userSet);
    }


    public void leaveRoom(RoomJoinPostReq joinInfo) {
        Room room = roomService.getRoomByCode(joinInfo.getCode());
        User user = userService.getUserByNick(joinInfo.getId());
        String host = room.getHost();
        String id = joinInfo.getId();
        if (host.equals(id)) { // 방 나가는 사람이 호스트인 경우
            roomService.endRoom(room);
        }
        RoomUser roomUser = roomUserService.getRoomUser(user, room);
        roomUserService.deleteRoomUser(roomUser);
    }
}

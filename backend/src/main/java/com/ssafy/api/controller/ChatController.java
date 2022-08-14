package com.ssafy.api.controller;

import com.ssafy.vo.RoomSocketVo;
import com.ssafy.vo.SocketVO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/ws")
public class ChatController {
    HashSet<String> userSet = new HashSet<>();

    private final SimpMessagingTemplate template;

    @MessageMapping("/receive")
    @SendTo("/send")
    public SocketVO SocketHandler(SocketVO socketVo, SimpMessageHeaderAccessor headerAccessor){
        String userName = socketVo.getUserName();
        String content = socketVo.getContent();
        String type = socketVo.getType();
        SocketVO result;
        if(type.equals("enter")){
            userSet.add(userName);
            result = new SocketVO(userName, content, "enter");
        }else if(type.equals("exit")) {
            userSet.remove(userName);
            result = new SocketVO(userName, content, "exit");
        }else {
            userSet.add(userName);
            result = new SocketVO(userName, content, type);
        }
        return result;
    }

    @MessageMapping("/room")
    public void roomSocketHandler(RoomSocketVo socketVo){
        if(socketVo.getType().equals("Enter")){

        };
        template.convertAndSend("/send/"+socketVo.getRoomId(), socketVo);
    }

    @RequestMapping("/users")
    @ResponseBody
    public List<String> getUserList(){
        return new ArrayList<>(userSet);
    }



}

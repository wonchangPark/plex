package com.ssafy.api.controller;

import com.ssafy.vo.SocketVO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Controller
@RequestMapping("/api/v1/ws")
public class ChatController {
    List<String> userList = new ArrayList<>();
    HashSet<String> userSet = new HashSet<>();

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

    @RequestMapping("/users")
    @ResponseBody
    public List<String> getUserList(){
        return new ArrayList<>(userSet);
    }
}

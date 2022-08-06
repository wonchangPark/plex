package com.ssafy.api.controller;

import com.ssafy.vo.SocketVO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ws")
public class ChatController {

    @MessageMapping("/receive")
    @SendTo("/send")
    public SocketVO SocketHandler(SocketVO socketVo){
        String userName = socketVo.getUserName();
        String content = socketVo.getContent();
        String type = socketVo.getType();
        SocketVO result = new SocketVO(userName, content, type);
        return result;
    }
}

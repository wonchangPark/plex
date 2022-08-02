package com.ssafy.api.controller;

import com.ssafy.api.service.WaitingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/waitingRooms")
@CrossOrigin("*")
public class WaitingRoomController {
    // 대기방 컨트롤러
    private final WaitingRoomService waitingRoomService;

    @Autowired
    public WaitingRoomController(WaitingRoomService waitingRoomService) {
        this.waitingRoomService = waitingRoomService;
    }
    @GetMapping
    public void test(){
        System.out.println("test");
        waitingRoomService.getAvailableRoomList(1);
    }
}

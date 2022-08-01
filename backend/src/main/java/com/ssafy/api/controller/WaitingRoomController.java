package com.ssafy.api.controller;

import com.ssafy.api.response.RoomInfoRes;
import com.ssafy.api.service.WaitingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{page}")
    public ResponseEntity<List<RoomInfoRes>> getAvailableRoomList(@PathVariable int page){
        System.out.println("controller on");
        return ResponseEntity.ok(waitingRoomService.getAvailableRoomList(page));
    }
}

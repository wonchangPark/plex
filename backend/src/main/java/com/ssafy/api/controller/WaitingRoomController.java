package com.ssafy.api.controller;

import com.ssafy.api.response.RoomInfoRes;
import com.ssafy.api.service.WaitingRoomService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "대기방 API", tags = {"WaitingRooms"})
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
    public void test() {
        System.out.println("test");
        waitingRoomService.getAvailableRoomList(1);
    }

    @GetMapping("/{page}")
    public ResponseEntity<List<RoomInfoRes>> getAvailableRoomList(@PathVariable int page){
        System.out.println("controller on");
        return ResponseEntity.ok(waitingRoomService.getAvailableRoomList(page));
    }

//    @GetMapping("/my")
//    public ResponseEntity<Object> getMyRecord()
}

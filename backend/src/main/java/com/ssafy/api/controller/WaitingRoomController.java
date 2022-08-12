package com.ssafy.api.controller;

import com.ssafy.api.response.RoomInfoRes;
import com.ssafy.api.service.WaitingRoomService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @GetMapping("/{page}")
    @ApiOperation(value = "대기방 목록", notes = "<strong>대기방 화면에서</strong>대기방 리스트를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<HashMap<String, Object>> getAvailableRoomList(@PathVariable @ApiParam(value = "현재 방페이지", required = true) int page){
        System.out.println("controller on");
        int lastPage = (int) Math.ceil(waitingRoomService.getAvailableRoomCount()/3.0);
        if(lastPage == 0) page = 1;
        else if(page > lastPage) page = lastPage;
        HashMap<String, Object> map = new HashMap<>();
        map.put("rooms", waitingRoomService.getAvailableRoomList(page));
        map.put("lastPage", lastPage);
        map.put("curPage", page);
        return ResponseEntity.ok(map);
    }

//    @GetMapping("/my")
//    public ResponseEntity<Object> getMyRecord()
}

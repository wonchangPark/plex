package com.ssafy.api.service;

import com.ssafy.api.response.RoomInfoRes;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

import java.util.List;

public interface WaitingRoomService {
    // 접속 인원들 가져오기
    // 현재 활성화된 방들 목록 가져오기
    // 새로 고침 버튼 클릭시 위의 두 메서드 둘 다 호출
//    List<User> getCurrentUserList(int page); // 한번에 10명씩
    List<RoomInfoRes> getAvailableRoomList(int page); // 한번에 3개씩
    int getAvailableRoomCount();
}

package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.db.entity.Room;

public interface RoomService {
    public Room createRoom(RoomCreatePostReq roomInfo, String code);

    Room getRoomByCode(String code);
}

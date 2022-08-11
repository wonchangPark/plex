package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;

public interface RoomUserService {

    void createRoomUser (User user, Room room) throws Exception;

    RoomUser getRoomUser (User user, Room room);

    void deleteRoomUser (RoomUser roomUser);
}

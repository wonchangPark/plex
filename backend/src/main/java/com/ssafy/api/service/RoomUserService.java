package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

public interface RoomUserService {

    public void createRoomUser(User user, Room room);
}

package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("roomUserService")
public class RoomUserServiceImpl implements RoomUserService {

    @Autowired
    RoomUserRepository roomUserRepository;

    @Override
    @Transactional
    public void createRoomUser(User user, Room room) {
        RoomUser roomUser = RoomUser.createRoomUser(user, room);
        roomUserRepository.save(roomUser);
    }

    @Override
    public RoomUser getRoomUser (User user, Room room) {
        return roomUserRepository.findRoomUser(user, room);
    }

    @Override
    @Transactional
    public void deleteRoomUser (RoomUser roomUser) {
        roomUserRepository.delete(roomUser);
    }
}

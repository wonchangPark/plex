package com.ssafy.api.service;

import com.ssafy.common.exception.NoMoreSpaceForRoomException;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;

@Service("roomUserService")
public class RoomUserServiceImpl implements RoomUserService {

    @Autowired
    RoomUserRepository roomUserRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public void createRoomUser(User user, Room room) throws Exception{
        RoomUser roomUser = RoomUser.createRoomUser(user, room);
        Long num = roomUserRepository.userNum(room);
        if(num == null){
            throw new NullPointerException();
        }
        if(num >= 6) throw new NoMoreSpaceForRoomException("this room is full");
        roomUserRepository.save(roomUser);
    }

    @Override
    public RoomUser getRoomUser (User user, Room room) {
        return roomUserRepository.findRoomUser(user, room);
    }

    @Override
    @Transactional
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public void deleteRoomUser (RoomUser roomUser) {
        roomUserRepository.findRoomUserByRoomUser(roomUser);
        roomUserRepository.delete(roomUser);
    }
}

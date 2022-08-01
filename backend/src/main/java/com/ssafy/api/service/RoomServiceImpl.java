package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Override
    @Transactional
    public Room createRoom(RoomCreatePostReq roomInfo, String privateCode) throws NullPointerException {
        Room room = Room.createRoom(roomInfo.getName(), privateCode, roomInfo.getHost(), roomInfo.getRoomSize());
        System.out.println("service");
        roomRepository.save(room);
        return room;
    }
}

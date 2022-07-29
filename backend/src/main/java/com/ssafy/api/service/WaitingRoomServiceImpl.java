package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("waitingRoomService")
public class WaitingRoomServiceImpl implements WaitingRoomService{

    private final RoomRepository roomRepository;
    private final int NUMPERPAGEFORUSER = 10;
    private final int NUMPERPAGEFORROOM = 5;



    @Autowired
    public WaitingRoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<User> getCurrentUserList(int page) {
        int from = (page-1) * NUMPERPAGEFORUSER;
        int to = page * NUMPERPAGEFORUSER;
        return roomRepository.getCurrentUserList(from, to);
    }

    @Override
    public List<Room> getAvailableRoomList(int page) {
        int from = (page-1) * NUMPERPAGEFORROOM + 1;
        int to = page * NUMPERPAGEFORROOM;
        return null;
    }
}

package com.ssafy.api.service;

import com.ssafy.api.response.RoomInfoRes;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.WaitingRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("waitingRoomService")
public class WaitingRoomServiceImpl implements WaitingRoomService{

    private final WaitingRoomRepository waitingRoomRepository;
//    private final int NUMPERPAGEFORUSER = 10;
    private final int NUMPERPAGEFORROOM = 3;



    @Autowired
    public WaitingRoomServiceImpl(WaitingRoomRepository waitingRoomRepository) {
        this.waitingRoomRepository = waitingRoomRepository;
    }

//    @Override
//    public List<User> getCurrentUserList(int page) {
//        int from = (page-1) * NUMPERPAGEFORUSER;
//        int to = page * NUMPERPAGEFORUSER;
//        return waitingRoomRepository.getCurrentUserList(from, to);
//    }

    @Override
    public List<RoomInfoRes> getAvailableRoomList(int page) {
        int from = (page-1) * NUMPERPAGEFORROOM;
        return waitingRoomRepository.getCurrentRoomList(from);
    }

    @Override
    public int getAvailableRoomCount() {
        return waitingRoomRepository.getAvailableRoomCount();
    }
}

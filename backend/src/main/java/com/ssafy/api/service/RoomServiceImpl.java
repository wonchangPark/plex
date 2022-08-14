package com.ssafy.api.service;

import com.ssafy.api.request.GameHistoryReq;
import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.ScoreHistoryPostReq;
import com.ssafy.db.entity.GameHistory;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.ScoreHistory;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("roomService")
public class RoomServiceImpl implements RoomService{

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public Room createRoom(RoomCreatePostReq roomInfo, String code) throws NullPointerException {
        Room room = Room.createRoom(roomInfo.getName(), code, roomInfo.getHost(), roomInfo.getRoomSize(), 1, false);
        System.out.println("service");
        roomRepository.save(room);
        return room;
    }

    @Override
    public Room getRoomByCode(String code){
        // 디비에서 방 정보를 방코드를 이용하여 조회
        return roomRepository.findByCode(code);// 없다면 null이 들어감
    }

    @Override
    @Transactional
    public void endRoom(Room room) {
        roomRepository.endRoom(room);
    }

    @Override
    @Transactional
    public long insertGameHistory(GameHistoryReq gameHistoryReq) {

        Long roomNo = gameHistoryReq.getRoomNo();
        Room room = roomRepository.findByNo(roomNo);
        roomRepository.saveGameHistory(room, gameHistoryReq);
        return roomRepository.getGameNo(roomNo);
    }

    @Override
    public void insertScoreHistory(ScoreHistoryPostReq scoreHistoryPostReq){
        long userNo = scoreHistoryPostReq.getUserNo();
        long gameHistoryNo = scoreHistoryPostReq.getGameHistoryNo();
        User user = userRepository.findOne(userNo);
        GameHistory gameHistory = roomRepository.getGameHistoryByNo(gameHistoryNo);
        ScoreHistory scoreHistory = ScoreHistory.createScoreHistory(user, gameHistory, scoreHistoryPostReq.getScore(), scoreHistoryPostReq.getTeamNo(), scoreHistoryPostReq.isWin(), scoreHistoryPostReq.getExerciseNum(), scoreHistoryPostReq.getGameNo() );
        roomRepository.saveScoreHistory(scoreHistory);
    }

}

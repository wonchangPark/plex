package com.ssafy.api.service;

import com.ssafy.api.request.RoomCreatePostReq;
import com.ssafy.api.request.ScoreHistoryPostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

public interface RoomService {
    Room createRoom(RoomCreatePostReq roomInfo, String code);

    Room getRoomByCode(String code);

    void endRoom(Room room);

    long insertGameHistory(Long roomNo);

    void insertScoreHistory(ScoreHistoryPostReq scoreHistoryPostReq);

    boolean isHost(User user, Long roomNo);

    void endGame(Long gameHistoryNo);

    boolean isGaming(Room room);

    boolean isAlreadyInRoom(User user);

    void isPlayingTrue(Long roomNo);

    void isPlayingFalse(Long roomNo);
}

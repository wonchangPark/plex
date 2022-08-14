package com.ssafy.db.repository;

import com.ssafy.api.request.GameHistoryReq;
import com.ssafy.db.entity.GameHistory;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.ScoreHistory;
import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class RoomRepository {

    @PersistenceContext
    EntityManager em;

    public void save(Room room){
        em.persist(room);
    }

    public Room findByCode(String code) {
        Room room = null;
        try {
            room = em.createQuery("select r from Room r where r.code = :code", Room.class)
                    .setParameter("code", code).getSingleResult();
        } catch (NoResultException ignored){}
        return room;
    }

    public Room findByNo(Long roomNo){
        Room room = null;
        try {
            room = em.createQuery("select r from Room r where r.no = :roomNo", Room.class)
                    .setParameter("roomNo", roomNo).getSingleResult();
        } catch (NoResultException ignored){}
        return room;
    }

    public void endRoom(Room room) {
        LocalDateTime endDate = LocalDateTime.now();
        room.setEndTime(endDate);
//        em.persist(room);
    }

    public List<User> getCurrentUserList(int from, int to) {
        // 캐시 서버에서 salt 값이 있는 user들을 가지고 와야 한다.
        em.createQuery("select u from User u").setFirstResult(from).setMaxResults(to).getResultList();
        return null;
    }

    public void saveGameHistory(Room room, GameHistoryReq gameHistoryReq){
        em.persist(GameHistory.createGameHistory(room, gameHistoryReq));
    }

    public Long getGameNo(long roomNo){
        List<GameHistory> list = em.createQuery("select gh from GameHistory gh where gh.room.no = :roomNo", GameHistory.class)
                .setParameter("roomNo", roomNo).setMaxResults(1).getResultList();
        return list.get(0).getNo();
    }

    public GameHistory getGameHistoryByNo(long gameHistoryNo){
        GameHistory gameHistory = null;
        try{
            gameHistory = em.createQuery("select gh from GameHistory gh where gh.no = :gameHistoryNo",GameHistory.class)
                    .setParameter("gameHistoryNo", gameHistoryNo).setMaxResults(1).getSingleResult();
        } catch(NoResultException ignored){
        }
        return gameHistory;
    }

    public void saveScoreHistory(ScoreHistory scoreHistory) {
        em.persist(scoreHistory);
    }
}

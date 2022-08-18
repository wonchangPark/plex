package com.ssafy.db.repository;

import com.ssafy.api.response.RoomInfoRes;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class WaitingRoomRepository {

    @PersistenceContext
    EntityManager em;

    // from 부터 to 까지의 대기방을 뽑아온다.
    public List<RoomInfoRes> getCurrentRoomList(int from){

        // N+1 문제 안일어남
        return em.createQuery("select new com.ssafy.api.response.RoomInfoRes(r.no, r.host, r.code, r.name, r.roomSize, r.gameNo, r.startTime, COUNT(ru)) " +
                "from Room r, RoomUser ru " +
                "where r = ru.room and r.endTime is null and r.isPrivate = false and r.isPlaying = false " +
                "group by ru.room " +
                "having COUNT(ru) <> r.roomSize " +
                "order by COUNT(ru) desc, r.startTime desc", RoomInfoRes.class).setFirstResult(from).setMaxResults(3).getResultList();
    }

    public int getAvailableRoomCount(){
        return em.createQuery("select new com.ssafy.api.response.RoomInfoRes(r.no, r.host, r.code, r.name, r.roomSize, r.gameNo, r.startTime, COUNT(ru)) " +
                "from Room r, RoomUser ru " +
                "where r = ru.room and r.endTime is null and r.isPrivate = false and r.isPlaying = false " +
                "group by ru.room " +
                "having COUNT(ru) <> r.roomSize " +
                "order by COUNT(ru) desc, r.startTime desc", RoomInfoRes.class).getResultList().size();
    }
}

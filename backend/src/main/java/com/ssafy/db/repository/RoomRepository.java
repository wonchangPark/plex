package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
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
}

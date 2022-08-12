package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.LockModeType;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoomUserRepository {

    @PersistenceContext
    EntityManager em;

    public void save(RoomUser roomUser){
        em.persist(roomUser);
    }

    public Long userNum(Room room){
        Long num = 0L;
        try{
            num= em.createQuery("select count(ur) from RoomUser ur " +
                            "where ur.room = :room ",Long.class)
                    .setParameter("room", room).getSingleResult();
            return num;
        }catch (NoResultException e){
            return null;
        }
    }

    public RoomUser findRoomUser (User user, Room room) {
        RoomUser roomUser = null;
        try {
            roomUser = em.createQuery("select r from RoomUser r where r.room = :room and r.user = :user", RoomUser.class)
                    .setParameter("room", room).setParameter("user", user).getSingleResult();
        } catch (NoResultException ignored) {}
        return roomUser;
    }

    public void delete(RoomUser roomUser) {
        em.remove(roomUser);
    }
}

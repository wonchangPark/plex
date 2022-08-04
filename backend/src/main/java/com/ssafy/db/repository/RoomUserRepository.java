package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.RoomUser;
import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

@Repository
public class RoomUserRepository {

    @PersistenceContext
    EntityManager em;

    public void save(RoomUser roomUser){
        em.persist(roomUser);
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

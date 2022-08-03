package com.ssafy.db.repository;

import com.ssafy.db.entity.RoomUser;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class RoomUserRepository {

    @PersistenceContext
    EntityManager em;

    public void save(RoomUser roomUser){
        em.persist(roomUser);
    }
}

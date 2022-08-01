package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoomRepository {

    @PersistenceContext
    EntityManager em;

    public List<User> getCurrentUserList(int from, int to) {
        // 캐시 서버에서 salt 값이 있는 user들을 가지고 와야 한다.
        em.createQuery("select u from User u").setFirstResult(from).setMaxResults(to).getResultList();
        return null;
    }
}

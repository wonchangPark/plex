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
                    .setParameter("room", room).setLockMode(LockModeType.PESSIMISTIC_WRITE).getSingleResult();
            return num;
        }catch (NoResultException e){
            return null;
        }
        // 애초에 RoomUser를 여기에서 lock을 걸어버리기 때문에 save 할때도 같은 트랜잭션 안이라서 lock이 같이 적용된다.
    }

    public RoomUser findRoomUser (User user, Room room) {
        RoomUser roomUser = null;
        try {
            roomUser = em.createQuery("select r from RoomUser r where r.room = :room and r.user = :user", RoomUser.class)
                    .setParameter("room", room).setParameter("user", user).getSingleResult();
        } catch (NoResultException ignored) {}
        return roomUser;
    }

    public RoomUser findRoomUserByRoomUser(RoomUser roomUser){
        RoomUser roomUser1 = em.find(RoomUser.class, roomUser.getNo());
        System.out.println(roomUser1);
        return roomUser1;
    }

    public void delete(RoomUser roomUser) {
        em.remove(em.contains(roomUser) ? roomUser : em.merge(roomUser));
    }

}

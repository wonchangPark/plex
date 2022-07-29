package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(User user){
        em.persist(user);
    }

    public User findOne(Long no){
        return em.find(User.class, no);
    }

    public User findByUserId(String userId){
        User user = null;
        try{
            user = em.createQuery("select u from User u where u.userId = :userId", User.class)
                    .setParameter("userId", userId).getSingleResult();
        } catch (NoResultException ignored){}
        return user;
    }

    public User findByUserNick(String nick) {
        User user = null;
        try{
            user = em.createQuery("select u from User u where u.nick = :nick", User.class)
                    .setParameter("nick", nick).getSingleResult();
        } catch (NoResultException ignored){}
        return user;
    }

    public User validationCheck(String userId, String nick){
        User user = null;
        try{
            user = em.createQuery("select u from User u where u.userId = :userId or u.nick = :nick", User.class)
                    .setParameter("userId", userId)
                    .setParameter("nick", nick).getSingleResult();
        } catch (NoResultException ignored){}
        return user;
    }

    public List<User> findAll(){
        return em.createQuery("select u from User u", User.class).getResultList();
    }

}

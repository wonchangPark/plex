package com.ssafy.db.repository;

import com.ssafy.api.response.UserExerciseRes;
import com.ssafy.api.response.UserInfoRes;
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

    public int setMyImage(User user, String image){
        int result = em.createQuery("update User u set u.img = :img where u = :user")
                .setParameter("img", image).setParameter("user",user).executeUpdate();
        em.clear();
        return result; // 반영된 레코드의 수를 반환. 즉 0을 반환하면 반영이 되지 않은 것
    }

    public List<UserExerciseRes> getMyTotalExercise(User user){
        return em.createQuery("select new com.ssafy.api.response.UserExerciseRes(gc.type, gc.name, sum(sh.score)) " +
                "from ScoreHistory sh, GameCategory gc " +
                "where sh.user = :user and sh.gameNo = gc.no " +
                "group by gc.no", UserExerciseRes.class).setParameter("user", user).getResultList();
    }

    public UserInfoRes getUserByUserNick(String nick) {
        UserInfoRes userInfoRes = null;
        try{
            userInfoRes = em.createQuery("select new com.ssafy.api.response.UserInfoRes(u.no, u.img) " +
                            "from User u " +
                            "where u.nick = :nick", UserInfoRes.class)
                    .setParameter("nick",nick).getSingleResult();
        } catch (NoResultException ignored){}
        return userInfoRes;
    }
}

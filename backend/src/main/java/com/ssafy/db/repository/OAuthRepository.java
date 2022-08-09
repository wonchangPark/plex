package com.ssafy.db.repository;

import com.ssafy.db.entity.OAuth;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

@Repository
public class OAuthRepository {
    // 나중에 redis로 대체될 예정

    @PersistenceContext
    EntityManager em;

    @Transactional
    public void save(OAuth oAuth){
        OAuth temp = findByUserId(oAuth.getUserId());
        if(temp != null){
            updateAll(oAuth);
        } else{
            em.persist(oAuth);
        }
    }

    public OAuth findByUserId(String userId){
        OAuth oAuth = null;
        try{
            oAuth = em.createQuery("select o from OAuth o where o.userId = :userId", OAuth.class)
                    .setParameter("userId", userId).getSingleResult();
        } catch (NoResultException ignored){
        }
        return oAuth;
    }

    @Transactional
    public void update(OAuth oAuth){
        em.createQuery("update OAuth o set o.accessToken = :accessToken where o.userId = :userId")
                .setParameter("accessToken", oAuth.getAccessToken())
                .setParameter("userId", oAuth.getUserId()).executeUpdate();
        em.clear();
    }

    @Transactional
    public void updateAll(OAuth oAuth){
        em.createQuery("update OAuth o set o.accessToken = :accessToken , o.refreshToken = :refreshToken where o.userId = :userId")
                .setParameter("accessToken", oAuth.getAccessToken())
                .setParameter("refreshToken", oAuth.getRefreshToken())
                .setParameter("userId", oAuth.getUserId()).executeUpdate();
        em.clear();
    }

    public OAuth findOne(String accessToken){
        OAuth oAuth = null;
        try{
            oAuth = em.createQuery("select o from OAuth o where o.accessToken = :accessToken", OAuth.class)
                    .setParameter("accessToken", accessToken).getSingleResult();
        } catch (NoResultException ignored){
        }
        return oAuth;
    }
}

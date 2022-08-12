package com.ssafy.db.repository;

import com.ssafy.api.response.RankingRes;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RankRepository {

    @PersistenceContext
    EntityManager em;

    public List<RankingRes> getRankList(){
        return em.createQuery("select new com.ssafy.api.response.RankingRes(u.no, u.nick, sum(sh.score)) " +
                "from ScoreHistory sh, User u " +
                "where u = sh.user " +
                "group by u.no " +
                "order by sum(sh.score) desc", RankingRes.class).getResultList();
    }

}



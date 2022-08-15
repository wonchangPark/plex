package com.ssafy.db.repository;

import com.ssafy.api.response.RankingRes;
import com.ssafy.api.response.UserTotalGameCntRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class JdbcTemplateRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTemplateRepository(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // rank 관련 sql
    public List<RankingRes> getRankList(){
        String query = "select u.user_no, u.user_nick, u.user_image, sum(sh.scorehistory_score) as totalscore, rank() over(order by sum(sh.scorehistory_score) desc) as ranking " +
                "from score_history sh, user u " +
                "where u.user_no = sh.user_no " +
                "group by u.user_no " +
                "order by totalscore desc";
        List<RankingRes> list = jdbcTemplate.query(query, rankingResRowMapper());
        for(RankingRes rankingRes: list){
            System.out.println(rankingRes.getUserNick()+ " "+rankingRes.getRank()+ " "+rankingRes.getScore());
        }
        return list;
    }

    public RankingRes getMyRank(Long userNo){
        String query = "select * " +
                "from (select u.user_no, u.user_id, u.user_nick, u.user_image, sum(sh.scorehistory_score) as totalscore, rank() over (order by sum(sh.scorehistory_score) desc) as ranking " +
                "from score_history sh, user u " +
                "where u.user_no = sh.user_no " +
                "group by u.user_no " +
                "order by totalscore) as ranktable " +
                "where ranktable.user_no = ?";
        List<RankingRes> list = jdbcTemplate.query(query, rankingResRowMapper(), userNo);
        return list.get(0);
    }

    private RowMapper<RankingRes> rankingResRowMapper(){

        return new RowMapper<RankingRes>() {
            @Override
            public RankingRes mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new RankingRes(
                        rs.getLong("user_no"),
                        rs.getString("user_nick"),
                        rs.getString("user_image"),
                        rs.getLong("totalscore"),
                        rs.getLong("ranking")
                );
            }
        };
    }

    // 총 판수 sql
    public UserTotalGameCntRes getMyTotalGameCnt(Long userNo){
        String query = "select count(*) as total, count(case when sh.scorehistory_win=true then 1 end) as win, count(case when sh.scorehistory_win=false then 1 end) as lose " +
                "from score_history sh " +
                "where user_no = ? " +
                "group by sh.user_no";
        List<UserTotalGameCntRes> list = jdbcTemplate.query(query, userTotalGameCntResRowMapper(), userNo);
        if(list.isEmpty()) return new UserTotalGameCntRes(0L,0L,0L);
        return list.get(0);
    }

    private RowMapper<UserTotalGameCntRes> userTotalGameCntResRowMapper(){
        return new RowMapper<UserTotalGameCntRes>() {
            @Override
            public UserTotalGameCntRes mapRow(ResultSet rs, int rowNum) throws SQLException {

                return new UserTotalGameCntRes(
                        rs.getLong("total"),
                        rs.getLong("win"),
                        rs.getLong("lose")
                );
            }
        };
    }

}

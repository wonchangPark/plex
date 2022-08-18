package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScoreHistory is a Querydsl query type for ScoreHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScoreHistory extends EntityPathBase<ScoreHistory> {

    private static final long serialVersionUID = -904954268L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScoreHistory scoreHistory = new QScoreHistory("scoreHistory");

    public final NumberPath<Long> exerciseNum = createNumber("exerciseNum", Long.class);

    public final QGameHistory gameHistory;

    public final NumberPath<Long> gameNo = createNumber("gameNo", Long.class);

    public final NumberPath<Long> no = createNumber("no", Long.class);

    public final NumberPath<Long> score = createNumber("score", Long.class);

    public final NumberPath<Integer> teamNo = createNumber("teamNo", Integer.class);

    public final QUser user;

    public final BooleanPath win = createBoolean("win");

    public QScoreHistory(String variable) {
        this(ScoreHistory.class, forVariable(variable), INITS);
    }

    public QScoreHistory(Path<? extends ScoreHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScoreHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScoreHistory(PathMetadata metadata, PathInits inits) {
        this(ScoreHistory.class, metadata, inits);
    }

    public QScoreHistory(Class<? extends ScoreHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.gameHistory = inits.isInitialized("gameHistory") ? new QGameHistory(forProperty("gameHistory"), inits.get("gameHistory")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}


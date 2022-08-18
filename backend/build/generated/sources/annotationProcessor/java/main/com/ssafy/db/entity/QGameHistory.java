package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGameHistory is a Querydsl query type for GameHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGameHistory extends EntityPathBase<GameHistory> {

    private static final long serialVersionUID = 1793635136L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGameHistory gameHistory = new QGameHistory("gameHistory");

    public final DateTimePath<java.time.LocalDateTime> endTime = createDateTime("endTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> no = createNumber("no", Long.class);

    public final QRoom room;

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public QGameHistory(String variable) {
        this(GameHistory.class, forVariable(variable), INITS);
    }

    public QGameHistory(Path<? extends GameHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGameHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGameHistory(PathMetadata metadata, PathInits inits) {
        this(GameHistory.class, metadata, inits);
    }

    public QGameHistory(Class<? extends GameHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.room = inits.isInitialized("room") ? new QRoom(forProperty("room")) : null;
    }

}


package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGameCategory is a Querydsl query type for GameCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGameCategory extends EntityPathBase<GameCategory> {

    private static final long serialVersionUID = 1148437458L;

    public static final QGameCategory gameCategory = new QGameCategory("gameCategory");

    public final StringPath name = createString("name");

    public final NumberPath<Long> no = createNumber("no", Long.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public QGameCategory(String variable) {
        super(GameCategory.class, forVariable(variable));
    }

    public QGameCategory(Path<? extends GameCategory> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGameCategory(PathMetadata metadata) {
        super(GameCategory.class, metadata);
    }

}


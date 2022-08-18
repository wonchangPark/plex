package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QOAuth is a Querydsl query type for OAuth
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOAuth extends EntityPathBase<OAuth> {

    private static final long serialVersionUID = 465997877L;

    public static final QOAuth oAuth = new QOAuth("oAuth");

    public final StringPath accessToken = createString("accessToken");

    public final StringPath refreshToken = createString("refreshToken");

    public final StringPath userId = createString("userId");

    public QOAuth(String variable) {
        super(OAuth.class, forVariable(variable));
    }

    public QOAuth(Path<? extends OAuth> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOAuth(PathMetadata metadata) {
        super(OAuth.class, metadata);
    }

}


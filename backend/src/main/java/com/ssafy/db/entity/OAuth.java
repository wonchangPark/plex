package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class OAuth {
    @Id
    private String userId;
    private String refreshToken;
    private String accessToken;

    public OAuth() { }

    public OAuth(String userId, String accessToken, String refreshToken) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

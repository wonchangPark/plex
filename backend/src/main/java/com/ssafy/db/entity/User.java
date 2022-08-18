package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Long no;

    @Column(name = "user_id", unique = true)
    @NotNull
    private String userId;

    @Column(name = "user_pw")
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    private String password;

    @Column(name = "user_nick", unique = true, length = 100)
    @NotNull
    private String nick;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_registerdate")
    @NotNull
    private LocalDateTime registerDate;

    @Column(name = "user_expiredate")
    private LocalDateTime expireDate;

    @Column(name = "user_image")
    private String img;

    protected User() {

    }

    protected User(String userId, String password, String nick, String email, String image) {
        this.userId = userId;
        this.password = password;
        this.nick = nick;
        this.email = email;
        this.registerDate = LocalDateTime.now();
        this.img = image;
    }
    public static User createUser(String userId, String password, String nick, String email, String image) {
        return new User(userId, password, nick, email, image);
    }

}

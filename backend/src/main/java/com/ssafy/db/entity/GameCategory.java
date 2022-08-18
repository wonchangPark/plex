package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class GameCategory {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gamecategory_no")
    private Long no;

    @Column(name = "gamecategory_name")
    private String name;

    @Column(name = "gamecategory_type")
    private int type;
}

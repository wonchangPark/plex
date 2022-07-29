package com.ssafy.db.entity;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class GameCategory {

    @Id @GeneratedValue
    @Column(name = "gamecategory_no")
    private Long no;

    @Column(name = "gamecategory_name")
    private String name;

    @Column(name = "gamecategory_type")
    private int type;
}

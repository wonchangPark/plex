package com.ssafy.db.entity;


import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RoomUser {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomuser_no")
    private Long no;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_no")
    private Room room;

    protected RoomUser(){}
    protected RoomUser(User user, Room room){
        // 유효성 검증
        this.user = user;
        this.room = room;
    }

    public static RoomUser createRoomUser(User user, Room room){
        return new RoomUser(user, room);
    }
}

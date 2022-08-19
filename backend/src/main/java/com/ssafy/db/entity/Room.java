package com.ssafy.db.entity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Room {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_no")
    private Long no;

    @Column(name = "room_name")
    @NotNull
    private String name;

    @Column(name = "room_code", unique = true)
    @NotNull
    private String code;

    @Column(name = "room_host")
    @NotNull
    private String host;

    @Column(name = "room_roomsize")
    @NotNull
    private Integer roomSize; // 방 최대인원

    @Column(name = "room_starttime")
    @NotNull
    private LocalDateTime startTime;

    @Column(name = "room_endtime")
    private LocalDateTime endTime;

    @Column(name = "room_gameno")
    private int gameNo;


    @Column(name = "room_isprivate")
    @NotNull
    private Boolean isPrivate;

    @Column(name = "room_isPlaying")
    @NotNull
    private Boolean isPlaying;


    protected Room(){}

    protected Room(String name, String code, String host, int roomSize, int gameNo, boolean isPrivate) {
        // setter에 대한 것은 추후에
        this.name = name;
        this.code= code;
        this.host = host;
        this.roomSize = roomSize;
        this.startTime = LocalDateTime.now();
        this.gameNo = gameNo;
        this.isPrivate = isPrivate;
        this.isPlaying = false;
    }

    public static Room createRoom(String name, String code, String host, int roomSize, int gameNo, boolean isPrivate){
        return new Room(name, code, host, roomSize, gameNo, isPrivate);
    }

    public static Room createRoom(Long roomNo){
        Room room = new Room();
        room.setNo(roomNo);
        return room;
    }
}

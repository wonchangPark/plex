<template>
    <div class="room-info d-flex flex-row justify-space-between deepblue" :class="[!room.visible ? 'room-info-hidden' : '']">
        <div class="d-flex flex-column justify-center ml-6">
            <div class="white--text room-host">{{ room.host }}</div>
            <div class="blue--text room-title">{{ room.name }}</div>
        </div>
        <div class="d-flex flex-row mr-3 align-center">
            <div class="white--text room-status mr-4">{{ room.userCount }}/6</div>
            <button class="blue deepblue--text room-submit pr-5 pl-5" @click="join">입장하기</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
const room = "room";
let RoomStore = "roomStore";
export default {
    name: "RoomItem",
    props: ["room"],
    methods: {
        ...mapActions(room, ["joinRoom"]),
        ...mapActions(RoomStore, [ "getRooms"]),
        join() {
            this.joinRoom(this.room.code);
            this.getRooms(1)
        },
    },
};
</script>

<style scoped>
.room-info {
    width: 95%;
    height: 95px;
    margin: 5px 0px;
    font-weight: bold;
}

.room-info-hidden {
    visibility: hidden;
}

.room-info .room-host {
    font-size: 1vw;
}

.room-info .room-title {
    font-size: 1.5vw;
}

.room-info .room-status {
    font-size: 1.8vw;
}

.room-info .room-submit {
    font-size: 1.5vw;
    height: 60%;
}
</style>

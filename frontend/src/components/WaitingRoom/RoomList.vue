<template>
    <ContentBox :height="90" :width="90">
        <div class="d-flex flex-column align-center" style="width: 100%; height: 100%">
            <div class="room-list d-flex flex-column align-center justify-space-around">
                <RoomItem @join="join"></RoomItem>
                <RoomItem></RoomItem>
                <RoomItem></RoomItem>
            </div>
            <div class="room-input-footer d-flex align-center flex-row justify-space-between">
                <div class="d-flex flex-row align-center">
                    <button class="primary pl-4 pr-4 room-list-btn mr-6">새로고침</button>
                    <button class="primary pl-6 pr-6 room-list-btn">코드입력</button>
                </div>
                <div class="d-flex flex-row align-center">
                    <v-icon class="primary--text" size="60px"> mdi-chevron-left </v-icon>
                    <div class="primary--text" style="font-weight: bold; font-size:1.7vw">
                      1/4
                    </div>
                    <v-icon class="primary--text" size="60px"> mdi-chevron-right </v-icon>
                </div>
            </div>
        </div>
    </ContentBox>
</template>

<script>
import RoomItem from "./Item/RoomItem.vue";
import ContentBox from "../common/ContentBox.vue";
import { mapActions } from "vuex"

export default {
    name: "RoomList",
    components: {
        RoomItem,
        ContentBox,
    },
    methods: {
        ...mapActions(['setRoomJoin']),
        join() {
            const joinInfo = {
                roomCode: '2B0dXodsPj',
                userName: 'test'
            }
            this.setRoomJoin(joinInfo)
            this.$router.push('/room')
        }
    },
};
</script>

<style scoped>
.room-list {
    width: 100%;
    height: 80%;
}
.room-input-footer {
    height: 20%;
    width: 95%;
}
.room-list-btn {
    font-weight: bold;
    font-size: 1.3vw;
    height: 50px;
}
</style>

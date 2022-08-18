<template>
    <ContentBox :height="100" :width="100">
        <div class="d-flex flex-column align-center" style="width: 100%; height: 100%">
            <div class="room-list d-flex flex-column align-center justify-space-around">
                <RoomItem v-for="(item, index) in rooms" :key="index" :room="item" :v-show="Object.keys(item).length !== 0"></RoomItem>
            </div>
            <div class="room-input-footer d-flex align-center flex-row justify-space-between">
                <div class="d-flex flex-row align-center">
                    <button class="primary pl-4 pr-4 room-list-btn mr-6" @click="refresh">새로고침</button>
                    <PrivateRoomDialog class="primary pl-4 pr-4 room-list-btn"></PrivateRoomDialog>
                </div>
                <div class="d-flex flex-row align-center">
                    <v-icon class="direction-button primary--text" size="60px" @mouseup="prevPageEvent"> mdi-chevron-left </v-icon>
                    <div class="primary--text" style="font-weight: bold; font-size: 1.7vw">{{ curPage }}/{{ lastPage }}</div>
                    <v-icon class="direction-button primary--text" size="60px" @mouseup="nextPageEvent"> mdi-chevron-right </v-icon>
                </div>
            </div>
        </div>
    </ContentBox>
</template>

<script>
import RoomItem from "./Item/RoomItem.vue";
import ContentBox from "../common/ContentBox.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import PrivateRoomDialog from "@/components/WaitingRoom/PrivateRoomDialog.vue";
let RoomStore = "roomStore";

export default {
    name: "RoomList",
    components: {
        RoomItem,
        ContentBox,
        PrivateRoomDialog,
    },
    data() {
        return {};
    },
    created() {
        this.getRooms(1);
    },
    methods: {
        ...mapActions(RoomStore, ["getRooms"]),
        ...mapMutations(RoomStore, ["NEXT_CUR_PAGE", "PREV_CUR_PAGE"]),
        nextPageEvent() {
            if (this.curPage < this.lastPage) this.NEXT_CUR_PAGE();
            this.getRooms(this.curPage);
        },
        prevPageEvent() {
            if (this.curPage > 1) this.PREV_CUR_PAGE();
            this.getRooms(this.curPage);
        },
        refresh() {
            this.getRooms(1);
        },
    },
    computed: {
        ...mapState(RoomStore, ["lastPage", "rooms", "curPage"]),
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
.direction-button {
    cursor: pointer;
}
</style>

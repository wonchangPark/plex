<template>
    <div id="waiting-room">
        <div class="d-flex flex-row justify-space-between" style="flex: 1 1 100%">
            <div class="d-flex flex-column" style="height: 100%; width: 25%">
                <div class="d-flex flex-column align-center" style="flex: 0 0 20%; height: 20%; width: 100%">
                    <div class="d-flex flex-column justify-space-around align-center" style="width: 100%; height: 100%">
                        <CreateRoomDialog v-if="Object.keys(this.room).length == 0" class="primary" style="width: 70%; height: 45px; font-weight: bold">
                        </CreateRoomDialog>
                        <button v-if="Object.keys(this.room).length == 0" class="primary" style="width: 70%; height: 45px; font-weight: bold" @click="rankBtn">
                            랭킹 보기
                        </button>
                    </div>
                </div>
                <div class="d-flex justify-center align-center" style="flex: 1 1 80%; height: 80%">
                    <UserList></UserList>
                </div>
            </div>
            <div class="d-flex justify-center" style="height: 100%; width: 75%">
                <div class="d-flex flex-column" style="height: 100%; width: 95%">
                    <div class="d-flex justify-center align-center" style="width: 100%; height: 55%">
                        <router-view />
                    </div>
                    <div class="d-flex justify-space-between align-center" style="width: 100%; height: 45%">
                        <div class="d-flex justify-center align-center" style="width: 40%; height: 90%">
                            <ContentBox :width="100" :height="90">
                                <div style="height: 100%; width: 100%">
                                    <TutorialCarousel style="height: 100%; width: 100%"></TutorialCarousel>
                                </div>
                            </ContentBox>
                            <!-- <UserData></UserData> -->
                        </div>
                        <div class="d-flex justify-center align-center" style="width: 57%; height: 90%">
                            <ChattingList></ChattingList>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import UserList from "@/components/WaitingRoom/UserList.vue";
import ChattingList from "@/components/WaitingRoom/ChattingList.vue";
import CreateRoomDialog from "@/components/WaitingRoom/CreateRoomDialog.vue";
//import UserData from "@/components/WaitingRoom/UserData.vue";
import ContentBox from '@/components/common/ContentBox.vue';
import TutorialCarousel from "@/components/WaitingRoom/TutorialCarousel.vue";

import { mapActions, mapGetters, mapState } from "vuex";
const Room = "room";
export default {
    name: "WaitingRoomView",
    components: {
        UserList,
        ChattingList,
        CreateRoomDialog,
        //  UserData,
        ContentBox,
        TutorialCarousel,
    },
    data() {
        return {
            homeMusic: require("../assets/audio/homeAudio.mp3"),
            musicOn: undefined,
        };
    },
    methods: {
        ...mapActions(["setRoomCreate"]),
        rankBtn() {
            if (Object.keys(this.room).length == 0) this.$router.push("/rank");
        },
    },
    computed: {
        ...mapGetters(["roompage"]),
        ...mapState(Room, ["room"]),
    },
    mounted() {
        this.musicOn = new Audio(this.homeMusic);
        this.musicOn.volume = 0.05;
        this.musicOn.play();
        this.musicOn.loop = true;
    },

    beforeRouteLeave(to, from, next) {
        if (this.musicOn != undefined) this.musicOn.pause();
        next();
    },
};
</script>
<style scoped>
#waiting-room {
    width: 100vw;
    height: 95vh;
    display: flex;
}
</style>

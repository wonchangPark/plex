<template>
    <div class="create-room-dialog">
        <v-dialog v-model="dialog" class="d-flex align-center" max-width="35vw">
            <template v-slot:activator="{ on, attrs }">
                <button style="width: 100%; height: 50px; font-weight: bold" v-bind="attrs" v-on="on">방 만들기</button>
            </template>

            <v-card class="room-create align-center" color="brown" width="35vw">
                <v-list-item-content class="align-center justify-center">
                    <v-container class="d-flex flex-column justify-center">
                        <v-row class="d-flex mt-2 mb-2">
                            <v-col class="text-center" cols="4">
                                <label class="primary--text" for="room-title">방 제목</label>
                            </v-col>
                            <v-col cols="8">
                                <input id="room-title" v-model="roomInfo.name" type="text" />
                            </v-col>
                        </v-row>

                        <v-row class="d-flex">
                            <v-col class="text-center" cols="4">
                                <div class="primary--text" style="font-size: 1.2rem; font-weight: bold">비공개</div>
                            </v-col>
                            <v-col cols="8">
                                <v-checkbox class="mt-0 pt-0" v-model="roomInfo.isPrivate"></v-checkbox>
                            </v-col>
                        </v-row>
                        <br />
                        <v-btn
                            color="primary"
                            elevation="0"
                            class="page-btn black--text align-self-center"
                            style="width: 30vw; height: 40px; font-weight: bold; font-size: 1.1rem"
                            @click="createRoom"
                        >
                            방 만들기
                        </v-btn>
                    </v-container>
                </v-list-item-content>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
const room = "room";
export default {
    name: "CreateRoomDialog",
    components: {},
    data: () => ({
        dialog: false,
        roomInfo: {
            name: "",
            host: "",
            roomSize: 6,
            isPrivate: false,
            gameNo: 1,
        },
    }),
    methods: {
        ...mapActions(room, ["roomCreate"]),
        ...mapMutations(room, ["INIT_HOST"]),
        createRoom() {
            this.roomInfo.host = this.getUser.nick;
            this.roomCreate(this.roomInfo);
            this.dialog = false;
        },
    },
    computed: {
        ...mapGetters(["getUser"]),
    },
};
</script>

<style>
.room-create label {
    font-size: 1.2rem;
    font-weight: bold;
}
.room-create input {
    background: white;
    border-radius: 5px;
    border: 3px solid #ffb82f;
    font-size: 1rem;
}
</style>

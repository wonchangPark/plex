<template>
    <content-box :height="100" :width="100">
        <div class="d-flex flex-row" style="width: 100%; height: 100%">
            <div class="d-flex flex-column" style="width: 75%; height: 100%">
                <div class="room-user-grid-wrap">
                    <RoomUserItem v-for="(item, index) in users" :key="index" :nick="item.nick" :height="80" :width="80"></RoomUserItem>
                </div>
            </div>
            <div class="d-flex align-center" style="width: 25%; height: 100%">
                <RoomUserControl :stompClient="stompClient"></RoomUserControl>
            </div>
        </div>
    </content-box>
</template>

<script>
import ContentBox from "../common/ContentBox.vue";
import RoomUserItem from "./Item/RoomUserItem.vue";
import RoomUserControl from "./Item/RoomUserControl.vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { API_BASE_URL } from "@/config";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import axios from "axios";

const room = "room";
export default {
    components: { ContentBox, RoomUserItem, RoomUserControl },
    name: "RoomUserList",
    data() {
        return {
            stompClient: null,
            userName: "",
            message: "",
            connected: false,
            isHost: null,
            sendVo: {},
        };
    },
    created: function () {
        this.isHost = this.getUser.nick === this.room.host ? true : false;
        this.connect();
    },
    beforeDestroy: function () {
        window.removeEventListener("beforeunload", this.exitRoom);
        this.exitRoom();
        this.stompClient.disconnect(() => {
            console.log("소켓 연결 해제");
        }, {});
    },
    methods: {
        ...mapMutations(room, ["ADD_USER", "DELETE_USER", "SET_USERS", "INIT_ROOM", "INIT_UESRS"]),
        ...mapActions(room, ["leaveRoom"]),
        connect() {
            const serverURL = API_BASE_URL + "/api/v1/ws";
            let socket = new SockJS(serverURL);
            this.stompClient = Stomp.over(socket);
            console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
            this.stompClient.connect(
                this.authHeader,
                (frame) => {
                    // 소켓 연결 성공
                    this.connected = true;
                    console.log("소켓 연결 성공", frame);
                    // 서버의 메시지 전송 endpoint를 구독합니다.
                    // 이런형태를 pub sub 구조라고 합니다.
                    this.stompClient.subscribe("/send/" + this.room.code, (res) => {
                        console.log("구독으로 받은 메시지 입니다.", res.body);
                        // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
                        this.receive(JSON.parse(res.body));
                    });
                    window.addEventListener("beforeunload", this.exitRoom);
                    if (!this.isHost) {
                        let msg = {
                            type: "Enter",
                            roomId: this.room.code,
                            user: {
                                userId: this.getUser.userId,
                                nick: this.getUser.nick,
                                team: 0,
                                isHost: false,
                            },
                        };
                        this.send(msg);
                    }
                },
                (error) => {
                    // 소켓 연결 실패
                    console.log("소켓 연결 실패", error);
                    this.connected = false;
                }
            );
        },
        exitRoom() {
            alert("확인");
            let msg = {
                type: "Leave",
                roomId: this.room.code,
                user: {
                    userId: this.getUser.userId,
                    nick: this.getUser.nick,
                    team: 0,
                    isHost: false,
                },
            };
            this.send(msg);
            let joinInfo = {
                code: this.room.code,
                id: this.getUser.nick,
            };
            let headers = this.authHeader;
            axios.post("https://localhost:8080/api/v1/rooms/leave-room", joinInfo, headers);
            this.stompClient.disconnect(() => {
                console.log("소켓 연결 해제");
            }, {});

            this.INIT_ROOM();
            this.INIT_UESRS();
        },
        send(msg) {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send("/room", JSON.stringify(msg), {});
            }
        },
        receive({ type, user, users }) {
            if (this.isHost) {
                if (type === "Enter") {
                    this.ADD_USER(user);
                } else if (type === "Leave") {
                    this.DELETE_USER(user.nick);
                }
            } else {
                if (type === "Sync") {
                    this.SET_USERS(users);
                }
            }
        },
    },
    computed: {
        ...mapState(room, ["room", "users"]),
        ...mapGetters(["getUser", "authHeader"]),
    },
    watch: {
        users() {
            if (this.isHost) {
                let msg = {
                    type: "Sync",
                    roomId: this.room.code,
                    users: this.users,
                };
                this.send(msg);
            }
        },
    },
};
</script>

<style scoped>
.room-user-grid-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    height: 100%;
}
</style>

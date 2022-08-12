<template>
    <content-box :height="90" :width="90">
        <div class="d-flex flex-row" style="width: 100%; height: 100%">
            <div class="d-flex flex-column" style="width: 75%; height: 100%">
                <div class="room-user-grid-wrap">
                    <div class="item d-flex justify-center align-center"><RoomUserItem :height="80" :width="80"></RoomUserItem></div>
                    <div class="item d-flex justify-center align-center"><RoomUserItem :height="80" :width="80"></RoomUserItem></div>
                    <div class="item d-flex justify-center align-center"><RoomUserItem :height="80" :width="80"></RoomUserItem></div>
                    <div class="item d-flex justify-center align-center"><RoomUserItem :height="80" :width="80"></RoomUserItem></div>
                    <div class="item d-flex justify-center align-center"><RoomUserItem :height="80" :width="80"></RoomUserItem></div>
                    <div class="item d-flex justify-center align-center"><RoomUserItem :height="80" :width="80"></RoomUserItem></div>
                </div>
            </div>
            <div class="d-flex align-center" style="width: 25%; height: 100%">
                <RoomUserControl></RoomUserControl>
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

export default {
    components: { ContentBox, RoomUserItem, RoomUserControl },
    name: "RoomUserList",
    data() {
        return {
            stompClient: null,
            userName: "",
            message: "",
            connected: false,
        };
    },
    created() {
        this.connect();
    },
    beforeDestroy() {
        this.stompClient.disconnect(() => {
            console.log("소켓 연결 해제");
        }, {});
    },
    methods: {
        connect() {
            const serverURL = API_BASE_URL + "/api/v1/ws";
            let socket = new SockJS(serverURL);
            this.stompClient = Stomp.over(socket);
            console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
            this.stompClient.connect(
                {},
                (frame) => {
                    // 소켓 연결 성공
                    this.connected = true;
                    console.log("소켓 연결 성공", frame);
                    // 서버의 메시지 전송 endpoint를 구독합니다.
                    // 이런형태를 pub sub 구조라고 합니다.
                    this.stompClient.subscribe("/send/123", (res) => {
                        console.log("구독으로 받은 메시지 입니다.", res.body);
                        // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
                        this.receive(JSON.parse(res.body));
                    });
                    this.send("ROOMENTER", "zzz", "", "123");
                },
                (error) => {
                    // 소켓 연결 실패
                    console.log("소켓 연결 실패", error);
                    this.connected = false;
                }
            );
        },
        send(type, userName, content, roomId) {
            console.log("Send Message:" + content);
            if (this.stompClient && this.stompClient.connected) {
                const msg = {
                    type,
                    userName,
                    content,
                    roomId,
                };
                this.stompClient.send("/room", JSON.stringify(msg), {});
            }
        },
        receive({ roomId }) {
            console.log("소켓 receive test:" + roomId);
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

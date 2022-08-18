<template>
    <content-box :height="100" :width="100">
        <div class="d-flex flex-row" style="width: 100%; height: 100%">
            <div class="d-flex flex-column" style="width: 75%; height: 100%">
                <div class="room-user-grid-wrap">
                    <RoomUserItem
                        v-for="(item, index) in users"
                        :key="index"
                        :nick="item.nick"
                        :height="80"
                        :width="80"
                        :img="item.img"
                        :team="item.team"
                    ></RoomUserItem>
                </div>
            </div>
            <div class="d-flex align-center" style="width: 25%; height: 100%">
                <RoomUserControl @exitEvent="exitRoomEvent" :isHost="isHost" :gameType="gameType" :stompClient="stompClient" @gameStart="gameStart"></RoomUserControl>
            </div>
        </div>
    </content-box>
</template>

<script>
import ContentBox from "../common/ContentBox.vue";
import RoomUserItem from "./Item/RoomUserItem.vue";
import RoomUserControl from "./Item/RoomUserControl.vue";
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";

const SocketStore = "socketStore";
const room = "room";
export default {
    components: { ContentBox, RoomUserItem, RoomUserControl },
    name: "RoomUserList",
    data() {
        return {
            userName: "",
            message: "",
            isHost: null,
            sendVo: {},
            gameType: 0,
            game: false,
            subscribe: null,
        };
    },
    created: function () {
        this.isHost = this.getUser.nick === this.room.host ? true : false;
        if (this.stompClient && this.stompClient.connected) {
            this.subscribe = this.stompClient.subscribe("/send/" + this.room.code, (res) => {
                console.log("구독으로 받은 메시지 입니다.", res.body);
                // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
                this.receive(JSON.parse(res.body));
            });
        }
        window.addEventListener("beforeunload", this.exitRoom);
        if (!this.isHost) {
            let msg = {
                type: "Enter",
                roomId: this.room.code,
                gameType: 0,
                user: {
                    userId: this.getUser.userId,
                    nick: this.getUser.nick,
                    team: 0,
                    isHost: false,
                    img: this.getUser.img,
                },
            };
            this.send(msg);
        }
        this.INIT_ROOM_RECV();
        this.SET_TOGGLE_TAB(false);
    },
    beforeDestroy: function () {
        window.removeEventListener("beforeunload", this.exitRoom);
        if (!this.game) {
            this.exitRoom();
        }
    },
    methods: {
        ...mapMutations(room, [
            "ADD_USER",
            "DELETE_USER",
            "SET_USERS",
            "INIT_ROOM",
            "INIT_USERS",
            "SET_ROOMJOIN",
            "UPDATE_USER",
            "INIT_ROOM_RECV",
            "ADD_ROOM_RECV",
            "SET_TOGGLE_TAB",
            "SET_GAME_ROOM",
        ]),
        ...mapActions(room, ["leaveRoom"]),
        gameStart() {
            this.game = true
        },
        exitRoom() {
            let leaveType;
            if (this.isHost) leaveType = "LeaveHost";
            else leaveType = "Leave";
            let msg = {
                type: leaveType,
                roomId: this.room.code,
                user: {
                    userId: this.getUser.userId,
                    nick: this.getUser.nick,
                    team: 0,
                    host: false,
                },
            };
            this.send(msg);
            this.INIT_ROOM();
            this.INIT_USERS();
            this.SET_TOGGLE_TAB(true);
            this.subscribe.unsubscribe();
            //router before each를 통해 분기 처리, 나갈때 init해주고 게임시작 할 때 room으로 이동
        },
        exitRoomEvent() {
            this.exitRoom();
            this.$router.push("/waiting");
        },
        send(msg) {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send("/room", JSON.stringify(msg), {});
            }
        },
        receive({ type, user, users, gameType }) {
            if (this.isHost) {
                if (type === "Enter") {
                    this.ADD_USER(user);
                } else if (type === "Leave") {
                    this.DELETE_USER(user.nick);
                } else if (type === "ChangeGame") {
                    this.gameType = gameType;
                } else if (type === "ChangeTeam") {
                    this.UPDATE_USER(user);
                }
            } else {
                if (type === "Sync") {
                    this.SET_USERS(users);
                    if (gameType !== undefined) this.gameType = gameType;
                } else if (type === "LeaveHost") {
                    this.$router.push("/waiting");
                } else if (type === "Start") {
                    this.game = true
                    this.SET_GAME_ROOM(this.room);
                    this.SET_ROOMJOIN()
                    if (this.gameType === 0) {
                        this.$router.push('/room')
                    } else if (this.gameType === 1) {
                        this.$router.push('/runningroom')
                    }
                }
            }
            if (type === "Message") {
                const msg = {
                    userName: user.nick,
                    content: user.content,
                    img: user.img,
                };
                this.ADD_ROOM_RECV(msg);
            }
        },
        sync() {
            if (this.isHost) {
                let msg = {
                    type: "Sync",
                    gameType: this.gameType,
                    roomId: this.room.code,
                    users: this.users,
                };
                this.send(msg);
            }
        },
    },
    computed: {
        ...mapState(room, ["room", "users"]),
        ...mapGetters(["getUser", "authHeader"]),
        ...mapState(SocketStore, ["stompClient", "connected"]),
    },
    watch: {
        users() {
            this.sync();
        },
        gameType() {
            this.sync();
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

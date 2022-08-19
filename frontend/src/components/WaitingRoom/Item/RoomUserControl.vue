<template>
    <div class="d-flex flex-column align-center justify-space-around" style="width: 100%; height: 90%">
        <div class="d-flex justify-center align-center primary--text" style="height: 5%; width: 100%; font-size: 1.5vw">방코드 : {{ this.room.code }}</div>
        <div class="d-flex justify-center align-center primary--text" style="height: 25%; width: 100%; font-size: 4vw">{{ this.users.length }}/6</div>
        <div class="primary--text d-flex flex-column align-center" style="height: 30%; width: 100%">
            <div class="d-flex justify-center" style="height: 30%; width: 100%; font-size: 1vw">게임 종류</div>
            <div class="d-flex flex-row justify-space-around align-center" style="height: 70%; width: 100%">
                <button
                    class="rope-icon"
                    :class="[gameType == 0 ? 'button-border' : '']"
                    style="width: 30%; height: 80%; border-radius: 3px"
                    @click="gameTypeEvent(0)"
                ></button>
                <button
                    class="run-icon"
                    :class="[gameType == 1 ? 'button-border' : '']"
                    style="width: 30%; height: 80%; border-radius: 3px"
                    @click="gameTypeEvent(1)"
                ></button>
            </div>
        </div>
        <div v-if="gameType === 0" class="primary--text d-flex justify-space-around align-center" style="height: 10%; width: 100%">
            <div style="font-size: 1vw">팀 선택</div>
            <button :class="[team == 0 ? 'button-border' : '']" class="team-button" style="background: white" @click="teamEvent(0)"></button>
            <button :class="[team == 1 ? 'button-border' : '']" class="team-button" style="background: #92b6d8" @click="teamEvent(1)"></button>
            <button :class="[team == 2 ? 'button-border' : '']" class="team-button" style="background: #ff6161" @click="teamEvent(2)"></button>
        </div>
        <div v-if="gameType === 1" class="primary--text d-flex justify-space-around align-center" style="height: 10%; width: 100%">
            <div style="font-size: 1vw">개인전</div>
        </div>
        <div class="d-flex flex-column justify-space-around align-center" style="height: 30%; width: 100%">
            <button v-if="isHost" class="primary" style="width: 90%; height: 35%; border-radius: 3px" @click="startEvent">게임시작</button>
            <button class="primary" @click="exitEvent" style="width: 90%; height: 35%; border-radius: 3px">나가기</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
const room = "room";
export default {
    name: "RoomUserControl",
    data() {
        return {
            team: 0,
        };
    },
    props: ["stompClient", "isHost", "gameType"],
    methods: {
        ...mapMutations(room, ["SET_ROOMJOIN", "INIT_TEAM_INFO", "SET_GAME_ROOM"]),
        gameTypeEvent(num) {
            if (this.isHost) {
                let msg = {
                    type: "ChangeGame",
                    gameType: num,
                    roomId: this.room.code,
                    users: this.users,
                };
                this.send(msg);
                if (num == 1) this.INIT_TEAM_INFO();
            }
        },
        teamEvent(num) {
            this.team = num;
            let msg = {
                type: "ChangeTeam",
                roomId: this.room.code,
                user: {
                    userId: this.getUser.userId,
                    nick: this.getUser.nick,
                    team: num,
                    host: this.isHost,
                    img: this.getUser.img,
                },
            };
            this.send(msg);
        },
        send(msg) {
            if (this.stompClient && this.stompClient.connected) {
                this.stompClient.send("/room", JSON.stringify(msg), {});
            }
        },
        startEvent() {
            if(this.gameType === 0){
                if(this.users.length < 6){
                    alert("게임 시작을 위한 인원이 부족합니다");
                    return;
                }
                let cnt = [0,0,0];
                for(let i=0 ; i < this.users.length; i++){
                    let user = this.users[i];
                    cnt[user.team]++;
                }
                if(cnt[1] !== 3 || cnt[2] !== 3){
                    alert("팀 선택을 완료해주세요");
                    return;
                }
            }
            if(this.gameType === 1){
                if(this.users.length < 2){
                    alert("게임 시작을 위한 인원이 부족합니다");
                    return;
                }
            }

            this.$emit('gameStart')
            this.SET_GAME_ROOM(this.room);
            if (this.isHost) {
                let msg = {
                    type: "Start",
                    roomId: this.room.code,
                    users: this.users,
                };
                this.send(msg);
                this.SET_ROOMJOIN()
                if (this.gameType === 0) {
                    this.$router.push('/room')
                } else if (this.gameType === 1) {
                    this.$router.push('/runningroom')
                }
            }
        },
        exitEvent(){
            this.$emit("exitEvent");
        }
    },
    computed: {
        ...mapState(room, ["users", "room", "roomJoin"]),
        ...mapGetters(["getUser"]),
    },
};
</script>

<style scoped>
.rope-icon {
    background-image: url("@/assets/rope_icon.PNG");
    background-size: cover;
}
.run-icon {
    background-image: url("@/assets/run_icon.PNG");
    background-size: cover;
}
.button-border {
    border: 3px solid #ffa800;
}
.team-button {
    width: 10%;
    height: 80%;
    border-radius: 3px;
}
</style>

<template>
    <div class="d-flex flex-column align-center justify-space-around" style="width: 100%; height: 90%">
        <div class="d-flex justify-center align-center primary--text" style="height: 30%; width: 100%; font-size: 4vw">4/6</div>
        <div class="primary--text d-flex flex-column align-center" style="height: 30%; width: 100%">
            <div class="d-flex justify-center" style="height: 30%; width: 100%; font-size: 1vw">게임 종류</div>
            <div class="d-flex flex-row justify-space-around align-center" style="height: 70%; width: 100%">
                <button
                    class="rope-icon"
                    :class="[gameType[0] ? 'button-border' : '']"
                    style="width: 30%; height: 80%; border-radius: 3px"
                    @click="gameTypeEvent(0)"
                ></button>
                <button
                    class="run-icon"
                    :class="[gameType[1] ? 'button-border' : '']"
                    style="width: 30%; height: 80%; border-radius: 3px"
                    @click="gameTypeEvent(1)"
                ></button>
            </div>
        </div>
        <div v-if="gameType[0] === true" class="primary--text d-flex justify-space-around align-center" style="height: 10%; width: 100%">
            <div style="font-size: 1vw">팀 선택</div>
            <button :class="[team[0] ? 'button-border' : '']" class="team-button" style="background: white" @click="teamEvent(0)"></button>
            <button :class="[team[1] ? 'button-border' : '']" class="team-button" style="background: #92B6D8" @click="teamEvent(1)"></button>
            <button :class="[team[2] ? 'button-border' : '']" class="team-button" style="background: red" @click="teamEvent(2)"></button>
        </div>
        <div v-if="gameType[1] === true" class="primary--text d-flex justify-space-around align-center" style="height: 10%; width: 100%">
            <div style="font-size: 1vw">개인전</div>
        </div>
        <div class="d-flex flex-column justify-space-around align-center" style="height: 30%; width: 100%">
            <button class="primary" style="width: 90%; height: 35%; border-radius: 3px">게임시작</button>
            <button class="primary" style="width: 90%; height: 35%; border-radius: 3px">나가기</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomUserControl",
    data() {
        return {
            gameType: [true, false],
            team: [false, false, false],
        };
    },
    methods: {
        gameTypeEvent(num) {
            for (let i = 0; i < this.gameType.length; i++) this.gameType[i] = false;
            this.gameType.splice(num, 1, true);
        },
        teamEvent(num) {
            for (let i = 0; i < this.team.length; i++) this.team[i] = false;
            this.team.splice(num, 1, true);
            console.log(this.team);
        },
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

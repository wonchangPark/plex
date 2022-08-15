<template>
    <div class="d-flex justify-center align-center">
        <div
            v-bind:class="{ team1: this.team == 1, team2: this.team == 2 }"
            class="room-user-item d-flex flex-column justify-center align-center"
            v-bind:style="{ width: this.width + '%', height: this.height + '%' }"
            style="background: #4a3e33"
        >
            <div>
                <v-avatar size="80" color="white">
                    <img :src="require(`@/assets/profile/${img}.png`)" alt="profile" />
                </v-avatar>
            </div>
            <div class="primary--text" style="font-size: 2vw">{{ nick }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomUserItem",
    props: ["height", "width", "nick", "team", "img"],
};
</script>

<style>
.room-user-item {
    border-radius: 15px;
}

.team1 {
    border: 3px solid #92b6d8;
}

.team2 {
    border: 3px solid #ff6161;
}
</style>

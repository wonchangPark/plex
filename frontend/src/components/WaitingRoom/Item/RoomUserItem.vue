<template>
    <div class="room-user-item brown d-flex flex-column justify-center align-center" v-bind:style="{ width: this.width + '%', height: this.height + '%' }">
        <div>
            <v-avatar size="80" color="white"></v-avatar>
        </div>
        <div class="primary--text" style="font-size:2vw">
            Nick
        </div>
    </div>
</template>

<script>
export default {
    name: "RoomUserItem",
    props: ["height", "width"],
};
</script>

<style>
.room-user-item {
    border-radius: 15px;
}
</style>

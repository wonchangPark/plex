<template>
    <div class="chatting-item d-flex flex-row align-center mr-4 ml-4 mb-1 brown px-2 py-1">
        <div class="d-flex flex-column justify-center align-center mr-2">
            <div>
                <v-avatar size="25" color="white">
                    <img v-if="img" :src="require(`@/assets/profile/${img}.png`)" alt="profile" />
                </v-avatar>
            </div>
            <div class="white--text">
                {{ name }}
            </div>
        </div>
        <div class="white--text" style="font-weight: bold; font-size: 0.8vw">
            {{ content }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "ChattingItem",
    props: ["name", "content","img"],
    computed: {
        ...mapGetters(["getUser"]),
    },
};
</script>

<style>
.chatting-item {
    border-radius: 15px;
    width: fit-content;
    font-family: 'yangjin';
    font-weight: 100;
}

@font-face { font-family: 'yangjin';
src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff') format('woff');
font-weight: 100;
font-style: normal; }
</style>

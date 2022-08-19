<template>
    <div class="chatting-item d-flex flex-row align-center mr-4 ml-4 mb-1 brown px-2 py-1">
        <div class="d-flex flex-column justify-center align-center mr-2">
            <div>
                <v-avatar size="25" color="white">
                    <img v-if="img" :src="require(`@/assets/profile/${img}.png`)" alt="profile" />
                </v-avatar>
            </div>
            <div class="white--text" style="font-weight:bolder; font-size: 0.8vw">
                {{ name }}
            </div>
        </div>
        <div class="white--text" style="font-size: 1vw; font-weight: bold;">
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
    font-family: 'IM_Hyemin-Regular';
    font-weight: normal;
    /* font-weight: 100; */
}

@font-face {
    font-family: 'IM_Hyemin-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Regular.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'YdestreetL';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/YdestreetL.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

</style>

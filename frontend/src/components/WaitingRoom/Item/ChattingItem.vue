<template>
    <div class="chatting-item d-flex flex-row align-center mr-4 ml-4 mb-1 brown px-2 py-1">
        <div class="d-flex flex-column justify-center align-center mr-2">
            <div>
                <v-avatar size="25" color="white">
                    
                <img
                    v-if="currentUserImage.userImage === undefined || currentUserImage.userImage === null"
                    src="@/assets/profile/test.png"
                    alt="chick">
                <img
                    v-else
                  :src="require(`@/assets/profile/${currentUserImage.userImage}.png`)"
                  alt="profile">
                </v-avatar>
            </div>
            <div class="white--text">
                {{ name }}
            </div>
        </div>
        <div class="white--text" style="font-weight: bold; font-size: 1.5vw">
            {{ content }}
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "ChattingItem",
    props: ["name", "content"],
    computed: {
        ...mapGetters([
            'getUser',
            'currentUserImage'
            ])
    },
    methods: {
        ...mapActions(['fetchImg']),
    },
    created(){
        this.fetchImg(this.name)
    }
};
</script>

<style>
.chatting-item {
    border-radius: 15px;
    width: fit-content;
}
</style>

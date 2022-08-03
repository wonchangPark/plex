<template>
    <div id="waiting-room">
        <div class="d-flex flex-row" style="flex: 1 1 100%">
            <div class="d-flex flex-column" style="flex: 1 1 20%">
                <div class="d-flex" style="flex: 1 1 30%">
                    <v-btn @click="fetchWaitingRoomPage">test</v-btn>
                </div>
                <div class="d-flex justify-center align-center" style="flex: 1 1 70%">
                    <UserList></UserList>
                </div>
            </div>
            <div class="d-flex flex-column" style="flex: 1 1 70%">
                <div class="d-flex justify-center align-center" style="flex: 1 1 60%">
                    <ContentBox :height="90" :width="90"></ContentBox>
                </div>
                <div class="d-flex justify-center align-center" style="flex: 1 1 45%">
                    <ContentBox :height="90" :width="90"></ContentBox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserList from "@/components/WaitingRoom/UserList.vue";
import ContentBox from "@/components/common/ContentBox.vue";

import { mapActions, mapGetters } from 'vuex'

export default {
    name: "WaitingRoomView",
    components: { UserList, ContentBox },
    computed: {
        ...mapGetters(['roompage'])
    },
    methods: {
        ...mapActions(['fetchWaitingRoomPage'])
    },
    created(){
        this.fetchWaitingRoomPage()
    }
};
</script>
<style scoped>
#waiting-room {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>

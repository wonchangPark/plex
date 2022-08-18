<template>
    <ContentBox :height="90" :width="70">
        <div class="d-flex flex-column align-center" style="height: 100%; width: 100%">
            <div class="primary--text d-flex justify-center align-center" style="font-size: 1.8vw; font-weight: bold; margin: 5px 0px; height: 10%">
                접속 인원:{{this.connectUsers.length}}
            </div>
            <div class="d-flex flex-column" style="flex: 0 0 90%; width: 100%; height: 90%">
                <div class="d-flex flex-column align-center user-info-list-box">
                    <UserInfo v-for="(item, index) in connectUsers" :nick="item.nick" :img="item.img ? item.img : primary" :key="index"></UserInfo>
                </div>
            </div>
        </div>
    </ContentBox>
</template>

<script>
import { mapActions, mapState} from 'vuex';
import ContentBox from "../common/ContentBox.vue";
import UserInfo from "./Item/UserInfo.vue";
const RoomStore = "roomStore";
export default {
    name: "UserList",
    components: { ContentBox, UserInfo },
    data () {
      return {
        primary: "gummybear"
      }
  },
    created: function(){
        this.getConnectUsers();
    },
    computed:{
        ...mapState(RoomStore, ["connectUsers"])
    },
    methods:{
        ...mapActions(RoomStore, ["getConnectUsers"]),
    }
};
</script>

<style scoped>
.user-info-list-box {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
}
.user-info-list-box::-webkit-scrollbar{
  display: none;
}
</style>

<template>
    <div id="waiting-room">
        <div class="d-flex flex-row" style="flex: 1 1 100%">
            <div class="d-flex flex-column" style="flex: 1 1 20%">
                <div class="d-flex" style="flex: 0 0 20%">asdf</div>
                <div class="d-flex justify-center align-center" style="flex: 0 0 80%; height: 80%">
                    <UserList></UserList>
                </div>
            </div>
            <div class="d-flex flex-column" style="flex: 1 1 70%">
                <div class="d-flex justify-center align-center" style="flex: 1 1 55%">
                    <RoomList></RoomList>
                </div>
                <div class="d-flex justify-center align-center" style="flex: 1 1 45%">
                    <ChattingList></ChattingList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserList from "@/components/WaitingRoom/UserList.vue";
import RoomList from "@/components/WaitingRoom/RoomList.vue";
import ChattingList from "@/components/WaitingRoom/ChattingList.vue";
export default {
    name: "WaitingRoomView",
    components: { UserList, RoomList, ChattingList },
};
</script>
<style scoped>
#waiting-room {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>

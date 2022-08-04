<template>
    <ContentBox class="chatting-list" :height="90" :width="90">
        <div class="d-flex flex-column pt-1 chatting_list" style="height: 100%; width: 100%">
            <div class="d-flex flex-column" style="height: 87%; width: 100%">
                <div class="d-flex flex-column chatting-list-box">
                    <ChattingItem></ChattingItem>
                    <ChattingItem></ChattingItem>
                    <ChattingItem></ChattingItem>
                    <ChattingItem></ChattingItem>
                    <ChattingItem></ChattingItem>
                </div>
            </div>
            <div class="d-flex flex-row align-center" style="height: 13%; width: 100%">
                <input class="ml-4 chatting-input white" type="text" />
                <button class="mx-2 chatting-submit primary">전송</button>
            </div>
        </div>
    </ContentBox>
</template>

<script>
import ContentBox from "../common/ContentBox.vue";
import ChattingItem from "./Item/ChattingItem.vue";
export default {
    name: "ChattingList",
    components: { ContentBox, ChattingItem },
    created: function () {
        console.log("Starting connection to WebSocket Server");
        this.connection = new WebSocket("wss://localhost:8080/ws/chat");

        this.connection.onmessage = (event) => {
            console.log(event);
            this.text += event.data;
            this.text += "\n";
        };

        this.connection.onopen = function (event) {
            console.log(event);
            console.log("Successfully connected to the echo websocket server...");
        };
    },
};
</script>

<style scoped>
.chatting-list-box {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
}

.chatting-list-box::-webkit-scrollbar {
    display: none;
}

.chatting-list .chatting-input {
    height: 80%;
    width: 95%;
    border-radius: 5px;
}

.chatting-list .chatting-submit {
    height: 80%;
    width: 5%;
    border-radius: 5px;
    font-weight: bold;
}
</style>

<template>
    <div class="chatting-item d-flex flex-row align-center mr-4 ml-4 brown px-2 py-1">
        <div class="d-flex flex-column justify-center align-center mr-2">
            <div>
                <v-avatar size="25" color="white"></v-avatar>
            </div>
            <div class="white--text">
                name
            </div>
        </div>
        <div class="white--text" style="font-weight: bold; font-size: 1.5vw;">
            chatting
        </div>
    </div>
</template>

<script>
export default {
    name: "ChattingItem",
};
</script>

<style>
.chatting-item{
    border-radius: 15px;
}
</style>

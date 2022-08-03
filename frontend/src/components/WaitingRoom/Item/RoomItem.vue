<template>
    <div class="room-info d-flex flex-row justify-space-between deepblue">
        <div class="d-flex flex-column justify-center ml-6">
            <div class="white--text room-host">host</div>
            <div class="blue--text room-title">방 제목</div>
        </div>
        <div class="d-flex flex-row mr-3 align-center">
            <div class="white--text room-status mr-4">1/6</div>
            <button class="blue deepblue--text room-submit pr-5 pl-5">입장하기</button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.room-info {
    width: 95%;
    height: 95px;
    margin: 5px 0px;
    font-weight: bold;
}

.room-info .room-host{
    font-size: 1vw;
}

.room-info .room-title{
    font-size: 1.5vw;
}

.room-info .room-status{
    font-size: 1.8vw;
}

.room-info .room-submit{
    font-size: 1.5vw;
    height: 60%;
}
</style>

<template>
  <div class="d-flex user-info flex-row justify-left align-center">
    <v-avatar class="mr-4 ml-4" color="white" size="45"></v-avatar>
    <div class="white--text font">NickddddddName</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-info {
  width: 90%;
  height: 72px;
  margin: 5px 0;
  border-radius: 15px;
  background: #4a3e33;
}

.user-info .font {
  font-weight: bold;
  font-size: 1.6vw;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

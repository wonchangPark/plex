<template>
  <ContentBox :height="90" :width="70">
    <div class="d-flex flex-column align-center" style="flex: 1 1 100%; width:100%">
      <div class="primary--text" style="font-size: 1.8vw; font-weight:bold; margin: 5px 0px">
        접속 인원
      </div>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
      <UserInfo></UserInfo>
    </div>
  </ContentBox>
</template>

<script>
import ContentBox from "../common/ContentBox.vue";
import UserInfo from "./Item/UserInfo.vue";
export default {
  name: "UserList",
  components: { ContentBox, UserInfo },
};
</script>

<style scoped></style>

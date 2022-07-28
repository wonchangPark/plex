<template>
  <ContentBox :height="90" :width="70">
    <div class="d-flex flex-column align-center" style="flex: 1 1 100%">
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

<template>
  <ContentBox :height="90" :width="90">
    <div class="d-flex flex-column pt-1" style="height: 100%; width: 100%">
      <div class="d-flex flex-column" style="height: 87%; width: 100%">
        <div class="d-flex flex-column chatting-list-box">
          <ChattingItem></ChattingItem>
          <ChattingItem></ChattingItem>
          <ChattingItem></ChattingItem>
          <ChattingItem></ChattingItem>
          <ChattingItem></ChattingItem>
        </div>
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
};
</script>

<style scoped>
.chatting-list-box {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}


.chatting-list-box::-webkit-scrollbar{
  display: none;
}
</style>

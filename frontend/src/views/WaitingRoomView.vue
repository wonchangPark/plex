<template>
  <div id="waiting-room">
    <div class="d-flex flex-row">
      <div class="d-flex flex-column" style="flex: 1 0 30%">
        <div style="flex: 1 1 auto">
          <ContentBox :height="100" :width="100"></ContentBox>
        </div>
      </div>
      <div class="d-flex" style="flex: 1 0 70%">1234</div>
    </div>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue";
export default {
  name: "WaitingRoomView",
  components: { ContentBox },
};
</script>
<style scoped>
#waiting-room {
  width: 100vw;
  height: 100vh;
}
</style>

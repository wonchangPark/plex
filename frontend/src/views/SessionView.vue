<template>
  <div
    class="d-flex flex-column align-center"
    style="height: 100%; width: 100%"
  >
    <div
      class="d-flex justify-center align-center"
      style="height: 50%; width: 100%"
    >
      <div
        class="d-flex"
        style="height: 98%; width: 90%; background: #ffffff"
      ></div>
    </div>
    <div
      class="d-flex justify-center align-center"
      style="height: 50%; width: 100%"
    >
      <div
        class="d-flex flex-column justify-space-between"
        style="height: 98%; width: 90%; "
      >
        <div
          class="d-flex flex-row justify-space-between"
          style="height: 48%; width: 100%%; background: #fdf345"
        >
          <div style="heigth: 100%; width: 23%; background: #123455">
          
          </div>
          <div style="heigth: 100%; width: 49%;">
            <ContentBox :height="100" :width="100">
            </ContentBox>
          </div>
          <div style="heigth: 100%; width: 23%; background: #123455">
          
          </div>
        </div>
        <div
          class="d-flex flex-row justify-space-between"
          style="height: 48%; width: 100%%; background: #fd3345"
        >
          <div style="heigth: 100%; width: 23%; background: #123455"></div>
          <div style="heigth: 100%; width: 23%; background: #123455"></div>
          <div style="heigth: 100%; width: 23%; background: #123455"></div>
          <div style="heigth: 100%; width: 23%; background: #123455"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentBox from '@/components/common/ContentBox.vue';
export default {
    name: "SessionView",
    components: { ContentBox }
};
</script>

<style></style>

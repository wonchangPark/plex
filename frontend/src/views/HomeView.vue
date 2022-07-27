<template>
  <div>
    <v-btn class="primary" elevation="0">확인하기</v-btn>
    <ContentBox :width="40" :height="30"> 
    
     </ContentBox>
  </div>
</template>

<script>
import ContentBox from "@/components/common/ContentBox.vue";

export default {
  name: "HomeView",

  components: {
    ContentBox,
  },
};
</script>

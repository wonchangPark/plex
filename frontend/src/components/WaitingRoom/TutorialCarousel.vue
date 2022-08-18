<template>
  <v-carousel height="100%" width=auto hide-delimiters>
    <v-carousel-item>
      <UserData></UserData>
    </v-carousel-item>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      class="carousel-img"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import UserData from '@/components/WaitingRoom/UserData.vue'
  export default {
    name : 'TutorialCarousel',
    components: { UserData},
    data () {
      return {
        items: [
          {
            src: require("@/assets/tutorial/슬라이드1.png"),
          },
          {
            src: require("@/assets/tutorial/슬라이드2.png"),
          },
          {
            src: require("@/assets/tutorial/슬라이드3.png"),
          },
          {
            src: require("@/assets/tutorial/슬라이드4.png"),
          },
          {
            src: require("@/assets/tutorial/슬라이드5.png"),
          },
        ],
      }
    },
  }
</script>
<style>
.carousel-img {
  margin-top: auto;
}
</style>

<template>
  <v-carousel height="auto" hide-delimiters>
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
            src: require("@/assets/tutorial/page1.png"),
          },
          {
            src: require("@/assets/tutorial/page2.png"),
          },
          {
            src: require("@/assets/tutorial/page3.png"),
          },
          {
            src: require("@/assets/tutorial/page4.png"),
          },
          {
            src: require("@/assets/tutorial/page5.png"),
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
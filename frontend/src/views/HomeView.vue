<template>
  <div class="home">
    <div class="container">
      <img src="@/assets/logo.png" alt="logo" class="item">
    </div>
      <router-link to="/login" class="item">로그인</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style>
img {
  width: 50%;
}
</style>
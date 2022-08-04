<template>
  <div>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar
            color="brown"
          >
            <span class="white--text text-h5">{{ user.initials }}</span>
          </v-avatar>
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
          >
            Edit Account
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn
            depressed
            rounded
            text
          >
            Disconnect
          </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </div>
</template>


<script>
export default {
  name: 'ProfileDialog',
  data(){
    return {
      dialog: false,
    }
  }
}
</script>

<style>

</style>
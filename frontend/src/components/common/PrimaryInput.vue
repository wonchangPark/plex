<template>
  <div id="primary-input">
    <v-row>
        <v-col v-bind:cols="this.label-col">
            <label class="primary--text" v-bind:for="'input'+this.label">{{labelText}}</label>
        </v-col>
        <v-col v-bind:cols="this.input-col">
            <input v-bind:id="'input'+this.label"/>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PrimaryInput",
  props: ["label-col", "input-col","label","labelText"],
};
</script>

<style scoped>
#primary-input {
  margin: 2% 0;
}
label{
  font-weight: bold;
  font-size: 16px;
}
input {
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 12px;
}
</style>

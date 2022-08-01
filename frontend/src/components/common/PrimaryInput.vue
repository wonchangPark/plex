<template>
  <div id="primary-input">
    <v-row>
        <v-col cols="2">
          <label class="primary--text" v-bind:for="'input'+this.label">{{labelText}}</label>
        </v-col>
        <v-col cols="10">
          <input v-bind:id="'input'+this.label" v-model="inputdata" @keypress="onDataInput"/>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PrimaryInput",
  data: () => {
    return {
      inputdata: '',
    }
  },
  props: ["label","labelText"],
  methods: {
    onDataInput() {
    this.$emit('input', this.inputdata)
    }
  }
};
</script>

<style scoped>
#primary-input {
  margin: 2% 0;
}
label{
    font-size: 16px;
}
input {
  background: white;
  border-radius: 5px;
  border: 3px solid #ffb82f;
  font-size: 12px;
}
</style>

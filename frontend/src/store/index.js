import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.module';
import room from './room'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    room
  }
});
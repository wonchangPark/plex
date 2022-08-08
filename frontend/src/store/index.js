import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth'
import waiting from './modules/waiting'
import room from './modules/room'
import roomStore from './modules/roomStore'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    waiting,
    room,
    roomStore,
  }
});
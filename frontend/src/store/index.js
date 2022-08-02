import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';

import roomStore from '@/store/modules/roomStore.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    roomStore,
  }
});
import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import waiting from './modules/waiting'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    waiting
  }
});
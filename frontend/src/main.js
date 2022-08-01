import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VeeValidate);

Vue.use(VueCookies);
Vue.$cookies.config("1d");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import veeValidate from 'vee-validate'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  vuetify,
  veeValidate,
  render: h => h(App)
}).$mount('#app')

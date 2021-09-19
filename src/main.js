import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import vuetify from './plugins/vuetify'
import { VueSpinners } from '@saeris/vue-spinners'

Vue.config.productionTip = false

Vue.use(VueSpinners)

Vue.use(VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

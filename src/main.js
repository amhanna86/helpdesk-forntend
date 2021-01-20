import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.get.accepts = 'application/json'
axios.defaults.headers.common.authorization = 'Bearer ' + localStorage.getItem('token')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

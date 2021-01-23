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
import Vuelidate from 'vuelidate'
import moment from 'moment'
import Status from './filters/status.js'
import Colors from './filters/colors.js'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY HH:mm')
  }
})

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.get.accepts = 'application/json'
axios.defaults.headers.common.authorization = 'Bearer ' + localStorage.getItem('token')

Vue.config.productionTip = false
Vue.use(Vuelidate)

Vue.filter('status', Status)
Vue.filter('colors', Colors)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

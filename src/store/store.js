import Vue from 'vue'
import Vuex from 'vuex'
import userAuth from './modules/user/auth'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  mutations,
  actions,
  getters,
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  modules: {
    userAuth,
  },
})

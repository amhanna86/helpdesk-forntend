import Vue from 'vue'
import Vuex from 'vuex'
import userAuth from './modules/user/auth'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import states from './states'

Vue.use(Vuex)

export const store = new Vuex.Store({
  mutations,
  actions,
  getters,
  states,
  modules: {
    userAuth,
  },
})

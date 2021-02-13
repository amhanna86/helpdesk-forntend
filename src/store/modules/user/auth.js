import axiosNoAuth from '../../../axiosNoAuth'
import router from '../../../router'
import axios from 'axios'

const state = {
  token: null,
  id: null,
  roles: [],
  type: null,
  expirationDate: null,
}

const getters = {
  isAuthenticated (state) {
    return state.token !== null
  },
  isAdmin (state) {
    return state.roles.includes('ROLE_ADMIN')
  },
  isCustomer (state) {
    return state.type === 'customer'
  },
  isAgent (state) {
    return state.type === 'agent'
  },
}

const mutations = {
  authUser (state, userData) {
    state.token = userData.token
    state.id = userData.id
    state.roles = userData.roles
    state.type = userData.type
    state.expirationDate = userData.expirationDate
  },
  clearAuthData (state) {
    state.token = null
    state.id = null
    state.roles = null
    state.type = null
    state.expirationDate = null
  },
}

const actions = {
  setLogoutTimer ({
                    commit,
                    dispatch,
                  }, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime * 1000)
  },
  signup ({
            commit,
            dispatch,
          }, formData) {
    axiosNoAuth.post('/register', formData)
      .then(response => {
        dispatch('setLogoutTimer', 3600)
        router.replace('/login')
      })
      .catch(error => console.log(error))
  },
  login ({
           commit,
           dispatch,
         }, authData) {
    axios.post('/login_check', {
      username: authData.email,
      password: authData.password,
    })
      .then(response => {
        localStorage.setItem('id', response.data.user.id)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('roles', JSON.stringify(response.data.user.roles))
        localStorage.setItem('type', response.data.user.type)
        localStorage.setItem('expirationDate', response.data.user.expirationDate)
        commit('authUser', {
          id: response.data.user.id,
          token: response.data.token,
          roles: response.data.user.roles,
          type: response.data.user.type,
        })
        dispatch('setLogoutTimer', 3600)
        router.push('/')
      })
      .catch(error => console.log(error))
  },
  logout ({ commit }) {
    commit('clearAuthData')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('roles')
    localStorage.removeItem('type')
    localStorage.removeItem('expirationDate')
    router.replace('/login')
  },
  tryAutoLogin ({
                  commit,
                  dispatch,
                }) {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const roles = localStorage.getItem('roles')
    const type = localStorage.getItem('type')
    dispatch('setLogoutTimer', 3600)
    if (!token) {
      return
    }
    const expirationDate = localStorage.getItem('expirationDate')
    const now = new Date().getTime() / 1000
    if (now >= expirationDate) {
      return
    }
    commit('authUser', {
      id: id,
      token: token,
      userRoles: roles,
      type: type,
    })
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}

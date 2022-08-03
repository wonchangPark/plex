import axios from 'axios'
import router from '@/router'

const API_URL = 'https://localhost:8080/api/v1';

export default {
  state: {
    token: localStorage.getItem('token') || '' ,
    authError: null
  },
  getters:{
    isLoggedIn: state => !!state.token,
    profile: state => state.profile,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: 'Bearer ' + state.token })
  },
  actions: {
    saveToken({ commit }, token) {
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    },

    removeToken({commit}){
      commit('SET_TOKEN', '')
      localStorage.setItem('token', '')
    },
    
    login({ commit, dispatch }, credentials) {

      axios({
        url: API_URL + '/auth/login',
        method: 'post',
        data: credentials
      })
        .then(res => {
          const token = res.data.accessToken
          dispatch('saveToken', token)
          router.push({ name: 'waiting' })
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    signup({ commit }, credentials) {
      axios({
        url: API_URL + '/users',
        method: 'post',
        data: credentials
      })
        .then(res => {
          console.log(res)
          router.push({ name: 'login' })
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    logout({dispatch}) {
      dispatch('removeToken')
      router.push({ name: 'home' })
      .error(err => {
        console.log(err)
      })
    },

  },
  mutations: {
    SET_TOKEN: (state, token) => state.token = token,
    SET_AUTH_ERROR: (state, error) => state.authError = error
  }
};

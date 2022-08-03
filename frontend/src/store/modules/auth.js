import axios from 'axios'
import router from '@/router'

const API_URL = 'https://localhost:8080/api/v1';

export default {
  state: {
    accessToken: localStorage.getItem('accessToken') || '' ,
    refreshToken: localStorage.getItem('refreshToken') || '',
    authError: null
  },
  getters:{
    isLoggedIn: state => !!state.accesstoken,
    profile: state => state.profile,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: 'Bearer ' + state.accessToken, Authorization2: 'Bearer '+state.refreshToken})
    },
  actions: {
    saveToken({ commit },{ accessToken, refreshToken}) {
      commit('SET_ACCESSTOKEN', accessToken)
      commit('SET_REFRESHTOKEN', refreshToken)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },

    removeToken({commit}){
      commit('SET_ACCESSTOKEN', '')
      commit('SET_REFRESHTOKEN', '')
      localStorage.setItem('accessToken', '')
      localStorage.setItem('refreshToken', '')
    },
    
    login({ commit, dispatch }, credentials) {

      axios({
        url: API_URL + '/auth/login',
        method: 'post',
        data: credentials
      })
        .then(res => {
          console.log(res)
          const accessToken = res.data.accessToken
          const refreshToken = res.data.refreshToken
          dispatch('saveToken', {accessToken, refreshToken})
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
    SET_ACCESSTOKEN: (state, accessToken) => state.accessToken = accessToken,
    SET_REFRESHTOKEN: (state, refreshToken) => state.refreshToken = refreshToken,
    SET_AUTH_ERROR: (state, error) => state.authError = error
  }
};

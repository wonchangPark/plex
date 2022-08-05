import axios from 'axios'
import router from '@/router'

const API_URL = 'https://localhost:8080/api/v1';

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || '' ,
    authError: null,
    userNav: {}
  },
  getters:{
    isLoggedIn: state => !!state.token,
    getUser: state => state.user,
    userNav: state => state.userNav,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: 'Bearer ' + state.token })
  },
  mutations: {
    SET_USER: (state, user) => state.user = user,
    SET_USERNAV: (state, userNav) => state.userNav = userNav,
    SET_TOKEN: (state, token) => state.token = token,
    SET_AUTH_ERROR: (state, error) => state.authError = error
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

    fetchNav({ commit, getters }) {
      if (getters.isLoggedIn) {
        axios({
          url: API_URL + '/users/me',
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => {
            console.log(res.data)
            const user = {
              no: res.data.no,
              userId: res.data.userId,
              nick: res.data.nick,
              email: res.data.email,
              totalScore: res.data.totalScore
            }
            commit('SET_USER', user)
            commit('SET_USERNAV', res.data)
          }
            )
          .catch(err => {
            console.log(err)
          })
      }
    },

    login({ commit, dispatch }, credentials) {

      axios({
        url: API_URL + '/auth/login',
        method: 'post',
        data: credentials
      })
        .then(res => {
          console.log(res.data)
          const user = {
            no: res.data.no,
            userId: res.data.userId,
            nick: res.data.nick,
            email: res.data.email,
            totalScore: res.data.totalScore
          }
          const token = res.data.accessToken
          dispatch('saveToken', token)
          commit('SET_USER', user)
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
          console.log(err.response.data)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    logout({ commit, dispatch }) {
      dispatch('removeToken')
      commit('SET_USER', {})
      router.push({ name: 'home' })
      .error(err => {
        console.log(err)
      })
    },
  }
};

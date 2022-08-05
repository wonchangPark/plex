import axios from 'axios'
import router from '@/router'

const API_URL = 'https://localhost:8080/api/v1';

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || '' ,
    authError: null,
    userNav: {},
    profile: {},
    passswords: {
      password: '',
      password2: ''
    },
    PWCheck: false,
  },
  getters:{
    isLoggedIn: state => !!state.token,
    getUser: state => state.user,
    userNav: state => state.userNav,
    profile: state => state.profile,
    passwords: state => state.passswords,
    PWCheck: state => state.PWCheck,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: 'Bearer ' + state.token })
  },
  mutations: {
    SET_USER: (state, user) => state.user = user,
    SET_USERNAV: (state, userNav) => state.userNav = userNav,
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_PASSWORDS: (state, passwords) => state.passswords = passwords,
    SET_PWCHECKED: (state) => {state.PWCheck = true},
    SET_PWNOCECKED: (state) => {state.PWCheck = false},
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
            commit('SET_USERNAV', res.data)
          }
            )
          .catch(err => {
            console.log(err)
          })
      }
    },

    fetchprofile({ commit, getters }) {
      if (getters.isLoggedIn) {
        axios({
          url: API_URL + '/users/me',
          method: 'get',
          headers: getters.authHeader,
        })
          .then(res => {
            console.log(res.data)
            commit('SET_PROFILE', res.data)
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
    passwordConfirm({commit}, passwords) {
      var p1 = passwords.password
      var p2 = passwords.password2
      if(p1.length < 6) {
        alert("입력한 글자가 6글자 이상이어야 합니다.")
        commit('SET_PWNOCECKED')
      }
      if( p1 != p2 ) {
        alert("비밀번호가 일치 하지 않습니다");
        commit('SET_PWNOCECKED')
      } else{
        alert("비밀번호가 일치합니다");
        commit('SET_PWCECKED')
      }

    },

    signup({ commit, dispatch}, credentials) {
      axios({
        url: API_URL + '/users',
        method: 'post',
        data: credentials
      })
        .then(res => {
          console.log(res)
          dispatch('passwordConfirm', (res.config.data.password, res.config.data.password2))
          if (this.PWCheck == true) {
            router.push({ name: 'login' })
          } else {
            commit('SET_AUTH_ERROR', res.response.data)
          }
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

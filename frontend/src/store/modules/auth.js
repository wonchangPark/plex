import axios from 'axios'
import router from '@/router'
import { API_BASE_URL } from '@/config';

const API_URL = API_BASE_URL + '/api/v1';

export default {
  state: {
    user: {},
    token: localStorage.getItem('token') || '' ,
    authError: null,
    passwordFlag: false,
    nicknameFlag: false,
    idFlag: false,
    rankingList: {},
    loginModal: false,
  },
  getters:{
    isLoggedIn: state => !!state.token,
    loginModal: state => state.loginModal,
    getUser: state => state.user,
    passwordFlag: state => state.passwordFlag,
    nicknameFlag: state => state.nicknameFlag,
    idFlag: state => state.idFlag,
    rankingList: state => state.rankingList,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: 'Bearer ' + state.token })
  },
  mutations: {
    SET_USER: (state, user) => state.user = user,
    SET_LOGINMODAL: (state, loginModal) => state.loginModal = loginModal,
    SET_PASSWORDFLAG: (state, passwordFlag) => state.passwordFlag = passwordFlag,
    SET_NICKNAMEFLAG: (state, nicknameFlag) => state.nicknameFlag = nicknameFlag,
    SET_IDFLAG: (state, idFlag) => state.idFlag = idFlag,
    SET_RANKINGLIST: (state, rankingList) => state.rankingList = rankingList,
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

    fetchUserInfo({ commit, getters }) {
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
          }
            )
          .catch(err => {
            console.log(err)
          })
      }
    },
    
    fetchRankingList({ commit, getters }){
      if (getters.isLoggedIn){
        axios({
          url: API_URL + '/users/ranking',
          method: 'get',
          headers: getters.authHeader,
        })
        .then(res => {
          console.log(res)
          const rankingList = res.data
          commit('SET_RANKINGLIST', rankingList)
        })
        .catch(err => {
          console.error(err.response.data)
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
          commit('SET_LOGINMODAL', true)
          commit('SET_AUTH_ERROR', err.response.data)
        })
    },

    passwordCheck({commit,dispatch}, credentials){
      commit('SET_PASSWORDFLAG')
      dispatch('signup', credentials)
    },

    nicknameCheck({ commit }, credentials) {
      axios({
        url: API_URL + '/users/nickname/check',
        method: 'post',
        data: credentials
      })
        .then(res => {
          console.log(res)
          commit('SET_NICKNAMEFLAG', true)
        })
        .catch(err => {
          console.error(err.response.data)
          commit('SET_NICKNAMEFLAG', false)

        })
    },

    idCheck({ commit }, credentials) {
      axios({
        url: API_URL + '/users/id/check',
        method: 'post',
        data: credentials
      })
        .then(res => {
          console.log(res)
          commit('SET_IDFLAG', true)
        })
        .catch(err => {
          console.log(err.response.data)
          commit('SET_IDFLAG', false)
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

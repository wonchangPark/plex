import axios from 'axios'
import router from '@/router'
import { API_BASE_URL } from '@/config';

const API_URL = API_BASE_URL + '/api/v1';

export default {
  state: {
    user: {},
    accessToken: localStorage.getItem('accessToken') || '' ,
    refreshToken: localStorage.getItem('refreshToken') || '',
    authError: null,
    authHeader: null,
    passwordFlag: false,
    nicknameFlag: false,
    idFlag: false,
    rankingList: {},
    exerciseList: {},
    totalGameList: {},
    myRanking: {},
    loginModal: false
  },
  getters:{
    isLoggedIn: state => !!state.accessToken,
    loginModal: state => state.loginModal,
    getUser: state => state.user,
    passwordFlag: state => state.passwordFlag,
    nicknameFlag: state => state.nicknameFlag,
    idFlag: state => state.idFlag,
    rankingList: state => state.rankingList,
    myRanking: state => state.myRanking,
    exerciseList: state => state.exerciseList,
    totalGameList: state => state.totalGameList,
    authError: state => state.authError,
    authHeader: state => state.authHeader},
    
  mutations: {
    SET_USER: (state, user) => state.user = user,
    SET_LOGINMODAL: (state, loginModal) => state.loginModal = loginModal,
    SET_PASSWORDFLAG: (state, passwordFlag) => state.passwordFlag = passwordFlag,
    SET_NICKNAMEFLAG: (state, nicknameFlag) => state.nicknameFlag = nicknameFlag,
    SET_IDFLAG: (state, idFlag) => state.idFlag = idFlag,
    SET_RANKINGLIST: (state, rankingList) => state.rankingList = rankingList,
    SET_MYRANKING: (state, myRanking) => state.myRanking = myRanking,
    SET_EXERCISELIST: (state, exerciseList) => state.exerciseList = exerciseList,
    SET_TOTALGAMELIST: (state, totalGameList) => state.totalGameList = totalGameList,
    SET_ACCESSTOKEN: (state, accessToken) => state.accessToken = accessToken,
    SET_REFRESHTOKEN: (state, refreshToken) => state.refreshToken = refreshToken,
    SET_AUTH_HEADER: (state, authHeader) => state.authHeader = authHeader,
    SET_AUTH_ERROR: (state, error) => state.authError = error
  },
  actions: {
    saveToken({ commit }, {accessToken, refreshToken}) {
      commit('SET_ACCESSTOKEN', accessToken)
      commit('SET_REFRESHTOKEN', refreshToken)
      commit('SET_AUTH_HEADER', ({ Authorization:'Bearer ' + accessToken,
      Authorization2: 'Bearer ' + refreshToken}))
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },

    removeToken({commit}){
      commit('SET_ACCESSTOKEN', '')
      commit('SET_REFRESHTOKEN', '')
      localStorage.setItem('accessToken', '')
      localStorage.setItem('refreshToken', '')
    },

    checkAccessToken({dispatch}, {accessToken, refreshToken}){
      dispatch('saveToken', {accessToken, refreshToken})
    },
    // checkAuthorization(){
    //   axios({
    //     headers: getters.authHeader
    //   })
    //   .then(res => {})
    //   .catch(err => {
    //     console.log(err.response.data)
    //     commit('SET_AUTH_ERROR', err.response.data)
    //   })
    // },

    fetchUserInfo({ commit, getters, dispatch }) {
      if (getters.isLoggedIn) {
        axios({
          url: API_URL + '/users/me',
          method: 'get',
          headers: getters.authHeader
        })
        .then(res => {
          console.log(getters.authHeader)
          if (res.headers.authorization){
            const newAccessToken = res.headers.authorization
            const refreshToken = localStorage.getItem('refreshToken') || ''
            console.log(newAccessToken)
            dispatch('saveToken', {newAccessToken, refreshToken})
            // commit('SET_AUTH_HEADER', { Authorization:'Bearer ' + newAccessToken,
            // Authorization2: 'Bearer ' + refreshToken})
            console.log('info', getters.authHeader)
            axios({
              url: API_URL + '/users/me',
              method: 'get',
              headers: getters.authHeader
            })
            .then(res => {
              console.log(res)
              const user = {
                no: res.data.no,
                userId: res.data.userId,
                nick: res.data.nick,
                email: res.data.email,
                totalScore: res.data.totalScore,
                img: res.data.img
              }
              commit('SET_USER', user)
            })
            .catch(err => {
              console.err(err.response.data)
            })
          } else {
            console.log('user', res.data)
            const user = {
              no: res.data.no,
              userId: res.data.userId,
              nick: res.data.nick,
              email: res.data.email,
              totalScore: res.data.totalScore,
              img: res.data.img
            }
            commit('SET_USER', user)
          }
        })
      }
    },
    
    fetchRankingList({ commit, getters, dispatch }){
      if (getters.isLoggedIn){
        axios({
          url: API_URL + '/rank',
          method: 'get',
          headers: getters.authHeader
        })
        .then(res => {
          console.log(getters.authHeader)
          if (res.headers.authorization){
            const newAccessToken = res.headers.authorization
            const refreshToken = localStorage.getItem('refreshToken') || ''
            dispatch('checkAccessToken', {newAccessToken, refreshToken})
            console.log(newAccessToken)
            // commit('SET_AUTH_HEADER', { Authorization:'Bearer ' + newAccessToken,
            // Authorization2: 'Bearer ' + refreshToken})
            console.log(getters.authHeader)
            axios({
              url: API_URL + '/rank',
              method: 'get',
              headers: getters.authHeader
            })
            .then(res => {
              console.log(res)
              const rankingList = res.data
              commit('SET_RANKINGLIST', rankingList)
            })
            .catch(err => {
              console.err(err.response.data)
            })
          } else {
            console.log(res)
            const rankingList = res.data
            commit('SET_RANKINGLIST', rankingList)
          }
        })
      .catch(err => {
        console.error(err.response.data)
      })
      }
    },

    fetchMyRanking({ commit, getters, dispatch }, no){
      if (getters.isLoggedIn){
        axios({
          url: API_URL + '/rank/' + no,
          method: 'get',
          headers: getters.authHeader
        })
        .then(res => {
          console.log(getters.authHeader)
          if (res.headers.authorization){
            const newAccessToken = res.headers.authorization
            const refreshToken = localStorage.getItem('refreshToken') || ''
            dispatch('checkAccessToken', {newAccessToken, refreshToken})
            console.log(newAccessToken)
            // commit('SET_AUTH_HEADER', { Authorization:'Bearer ' + newAccessToken,
            // Authorization2: 'Bearer ' + refreshToken})
            console.log(getters.authHeader)
            axios({
              url: API_URL + '/rank/' + no,
              method: 'get',
              headers: getters.authHeader
            })
            .then(res => {
              console.log('myranking', res)
              const myRanking = res.data
              commit('SET_MYRANKING', myRanking)
            })
            .catch(err => {
              console.err(err.response.data)
            })
          } else {
            console.log('myranking', res)
            const myRanking = res.data
            commit('SET_MYRANKING', myRanking)
          }
        })
      .catch(err => {
        console.error(err.response.data)
      })
      }
    },

    fetchExercise({getters, commit, dispatch}){
      if (getters.isLoggedIn) {
        axios({
          url: API_URL + '/users/exercise',
          method: 'get',
          headers: getters.authHeader
        })
        .then(res => {
          if (res.headers.authorization) {
            const newAccessToken = res.headers.authorization
            const refreshToken = localStorage.getItem('refreshToken') || ''
            console.log(newAccessToken)
            dispatch('checkAccessToken', {newAccessToken, refreshToken})
            console.log(newAccessToken)
            commit('SET_AUTH_HEADER', { Authorization:'Bearer ' + newAccessToken,
            Authorization2: 'Bearer ' + refreshToken})
            axios({
              url: API_URL + '/users/exercise',
              method: 'get',
              headers: getters.authHeader
            })
            .then(res => {
              console.log('ex', res)
              const exerciseList = res.data
              commit('SET_EXERCISELIST', exerciseList)
            })
            .catch(err => {
              console.log(err.response.data)
            })
          } else {
            console.log(res)
            const exerciseList = res.data
            commit('SET_EXERCISELIST', exerciseList)
          }
        })
      }
    },

    fetchTotalGame({getters, commit, dispatch}){
      if (getters.isLoggedIn) {
        axios({
          url: API_URL + '/users/totalgame',
          method: 'get',
          headers: getters.authHeader
        })
        .then(res => {
          if (res.headers.authorization) {
            const newAccessToken = res.headers.authorization
            const refreshToken = localStorage.getItem('refreshToken') || ''
            console.log(newAccessToken)
            dispatch('checkAccessToken', {newAccessToken, refreshToken})
            console.log(newAccessToken)
            commit('SET_AUTH_HEADER', { Authorization:'Bearer ' + newAccessToken,
            Authorization2: 'Bearer ' + refreshToken})
            axios({
              url: API_URL + '/users/totalgame',
              method: 'get',
              headers: getters.authHeader
            })
            .then(res => {
              console.log('tot', res)
              const totalGameList = res.data
              commit('SET_TOTALGAMELIST', totalGameList)
            })
            .catch(err => {
              console.err(err.response.data)
            })
          } else {
            console.log(res)
            const totalGameList = res.data
            commit('SET_TOTALGAMELIST', totalGameList)
          }
        })
      }
    },

    changeImg({getters}, img){
      if (getters.isLoggedIn){
        axios({
          url: API_URL + '/users/image',
          method: 'post',
          data: img,
          headers: getters.authHeader,
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err.response.data)
        })
      //   axios.post(API_URL+'/users/image', {imgData: img, headers: getters.authHeader})
      //   .then((req) => {
      //     console.log(req)
      //   })
      //   .catch(err => {
      //     console.error(err.response.data)
      //   })
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
            totalScore: res.data.totalScore,
            img: res.data.img
          }
          const accessToken = res.data.accessToken
          const refreshToken = res.data.refreshToken
          dispatch('saveToken', {accessToken, refreshToken})
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
        .catch(err => {
          console.log(err.response.data)
        })
    },
  }
};

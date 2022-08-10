import axios from 'axios'
import { API_BASE_URL } from '@/config';

const API_URL = API_BASE_URL + '/api/v1';

export default {
  namespaced: false,
  state: {
    roomCreate : false,
    roomInfo : {
      name: '',
      host: '',
      roomSize: '',
      gameNo: 1,
      isPrivate: false,
    },
    roomJoin : false,
    joinInfo : {
      roomCode: '',
      userName: ''
    },
    predictionData: {left:0, right:0},
  },
  getters: {
    roomCreate: state => state.roomCreate,
    roomInfo: state => state.roomInfo,
    roomJoin: state => state.roomJoin,
    joinInfo: state => state.joinInfo,
    predictionData: state => state.predictionData
  },
  mutations: {
    SET_ROOMCREATE: (state) => {state.roomCreate = true},
    SET_ROOMCLOSE: (state) => {
      state.roomCreate = false
      state.roomJoin = false
    },
    SET_ROOMINFO: (state, roomInfo) => {state.roomInfo = roomInfo},
    SET_ROOMJOIN: (state) => {state.roomJoin = true},
    SET_JOININFO: (state, joinInfo) => {state.joinInfo = joinInfo},
    SET_PREDICTION: (state, predictionData) => {state.predictionData = predictionData}
  },
  actions: {
    setRoomCreate ({ commit }, roomInfo) {
      commit('SET_ROOMCREATE')
      commit('SET_ROOMINFO', roomInfo)
    },
    setRoomClose ({ commit }) {
      commit('SET_ROOMCLOSE')
    },
    setRoomJoin ({ commit, getters }, roomCode) {
      commit('SET_ROOMJOIN')
      const joinInfo = {
          roomCode: roomCode,
          userName: getters.getUser.userId,
      }
      commit('SET_JOININFO', joinInfo)
    },
    setPrediction({commit}, predictionData) {
      commit('SET_PREDICTION', predictionData)
    },
    leaveRoom ({ getters }, joinInfo) {
      axios({
        url: API_URL + '/rooms/leave-room',
        method: 'post',
        data: joinInfo,
        headers: getters.authHeader
      })
      .then( (res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
    },
  }
}
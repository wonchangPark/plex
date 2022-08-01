import router from '@/router'
import axios from 'axios'

export default {
  namespaced: false,
  state: {
    roomCreate : false,
    roomInfo : {
      name: '',
      host: '',
      roomSize: ''
    },
  },
  getters: {
    roomCreate: state => state.roomCreate,
    roomInfo: state => state.roomInfo,
  },
  mutations: {
    SET_ROOMCREATE: (state) => {state.roomCreate = true},
    SET_ROOMINFO: (state, roomInfo) => {state.roomInfo = roomInfo}
  },
  actions: {
    setRoomCreate ({ commit }, roomInfo) {
      commit('SET_ROOMCREATE')
      commit('SET_ROOMINFO', roomInfo)
    },
  }
}
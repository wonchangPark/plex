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
    }
  },
  getters: {
    roomCreate: state => state.roomCreate,
    roomInfo: state => state.roomInfo,
    roomJoin: state => state.roomJoin,
    joinInfo: state => state.joinInfo,
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
  }
}
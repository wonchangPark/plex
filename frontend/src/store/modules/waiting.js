import axios from '@/axios'

const API_URL = 'https://localhost:8080/api/v1';

export default {
  state: {
    roompage: ''
  },
  getters:{
    roompage: state => state.roompage
  },
  actions: {
    fetchWaitingRoomPage({commit, getters}){
      axios({
        url: API_URL + '/waitingRooms',
        methods: 'get',
        headers: getters.authHeader,
      })
      .then(res => {
        console.log(res)
        commit('SET_ROOMPAGE', res.data)})
      .catch(err => console.log(err))
    }
  },
  mutations: {
    SET_ROOMPAGE: (state, roompage) => state.roompage = roompage,  
  }
};

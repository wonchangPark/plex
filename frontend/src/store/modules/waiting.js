import axios from '@/axios'
import store from '@/store'
import router from '@/router'

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
      .catch(err =>{
        console.log(err)
        if (err.response.status == 401){
          store.dispatch('removeToken')
          router.push({name: 'login'})
      }
        })
    }
  },
  mutations: {
    SET_ROOMPAGE: (state, roompage) => state.roompage = roompage,  
  }
};

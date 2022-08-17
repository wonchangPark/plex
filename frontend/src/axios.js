import axios from 'axios'
import store from "@/store";
import router from './router';


axios.interceptors.response.use(
  (response) => {
    return response
  }, function (error){
    console.log('axios.interceptors.error')
    switch (error.response.status){
      case 401:
        store.dispatch('removeToken')
        console.log(error.response.status)
        router.push({name: 'login'})
        break;
      case 405:
        console.log('axios.interceptors.response리스폰스', error.config)
        if (error.response.headers['authorization']) {
          const refreshToken = localStorage.getItem('refreshToken')
          const newAccessToken = error.response.headers['authorization']
          console.log('axios.inteceptors에세스', newAccessToken)
          console.log('axios.inteceptors리프레쉬', refreshToken)
          error.config.headers['Authorization'] = "Bearer " + newAccessToken
          error.config.headers['Authorization2'] = "Bearer " + refreshToken
          store.dispatch('saveToken', {accessToken:newAccessToken, refreshToken})
          console.log('axios.interceptors,헤더', store.getters.authHeader)

          return axios.request(error.config)
        }
      }
    return Promise.reject(error);
  }
)



export default axios;
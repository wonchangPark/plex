import store from '@/store'
import router from '@/router'

function refresh(error) {
  switch (error.response.status) {
      case 401:
          store.dispatch("removeToken");
          router.push({ name: "login" });
          break;
      case 405:
          console.log("axios.interceptors.response리스폰스", error.response);
          if (error.response.headers["authorization"]) {
              const refreshToken = localStorage.getItem("refreshToken");
              const newAccessToken = error.response.headers["authorization"];

              store.dispatch("saveToken", { accessToken: newAccessToken, refreshToken });
              console.log("axios.interceptors,헤더", store.getters.authHeader);
          }
          break;
  }
}

export { refresh };
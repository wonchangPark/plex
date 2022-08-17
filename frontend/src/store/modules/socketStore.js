import { API_BASE_URL } from "@/config";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import router from "@/router";
import store from "@/store"

const socketStore = {
    namespaced: true,
    state: {
        connected: false,
        stompClient: null,
    },
    getters: {},
    mutations: {
        CONNECT_SOCKET: (state, authHeader) => {
            const serverURL = API_BASE_URL + "/api/v1/ws";
            let socket = new SockJS(serverURL);
            state.stompClient = Stomp.over(socket);
            console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
            state.stompClient.connect(
                authHeader,
                (frame) => {
                    // 소켓 연결 성공
                    state.connected = true;
                    console.log("소켓 연결 성공", frame);
                    router.push({ name: "waiting" });
                },
                (error) => {
                    // 소켓 연결 실패
                    console.log("소켓 연결 실패", error);
                    state.connected = false;
                    if (error.response.status == 401){
                        store.dispatch('removeToken')
                        router.push({name: 'login'})
                    }
                }
            );
        },
        DISCONNECT_SOCKET: (state) => {
            state.stompClient.disconnect(() => {
                console.log("소켓 연결 해제");
                state.connected = false;
            }, {});
        },
    },
    actions: {
        connectSocket: ({ commit, rootState }) => {
            commit("CONNECT_SOCKET", rootState.auth.authHeader);
        },
        disconnectSocket: ({ commit }) => {
            commit("DISCONNECT_SOCKET");
        },
    },
};

export default socketStore;

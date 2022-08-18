import { createRoomApi, leaveRoomApi, setRoomUserApi } from "@/api/room.js";
import router from "@/router";
import axios from "@/axios";
import store from "@/store"
import { refresh } from "@/api/error";
import { API_BASE_URL } from '@/config';

const API_URL = API_BASE_URL + "/api/v1";

const room = {
    namespaced: true,
    state: {
        room: {},
        gameRoom:{},
        roomJoin: false,
        users: [],
        gameHistoryNo: 0,
        allRecvList: [],
        roomRecvList: [],
        isAll: true,
    },
    getters: {
        roomJoin: state => state.roomJoin,
        gameHistoryNo: state => state.gameHistoryNo
    },
    mutations: {
        SET_ROOM: (state, room) => {
            state.room = room;
        },
        INIT_USERS: (state) => {
            state.users = [];
        },
        INIT_HOST: (state, user) => {
            state.users = [];
            state.users.push(user);
        },
        SET_USERS: (state, users) => {
            state.users = users;
        },
        DELETE_USER: (state, nick) => {
            state.users = state.users.filter((user) => user.nick !== nick);
        },
        ADD_USER: (state, user) => {
            state.users.push(user);
        },
        INIT_ROOM: (state) => {
            state.room = {};
        },
        SET_ROOMJOIN: (state) => {
            state.roomJoin = true;
        },
        SET_ROOMCLOSE: (state) => {
            state.roomJoin = false;
        },
        UPDATE_USER: (state, user) => {
            state.users = state.users.map((item) => {
                console.log(item);
                console.log(user);
                if (item.nick === user.nick) return user;
                return item;
            });
        },
        INIT_TEAM_INFO: (state) => {
            state.users = state.users.map((user) => {
                user.team = 0;
                return user;
            });
        },
        SET_GAME_HISTORY_NO: (state, gameHistoryNo) => state.gameHistoryNo = gameHistoryNo,
        INIT_ALL_RECV: (state) => {
            state.allRecvList = [];
        },
        INIT_ROOM_RECV: (state) => {
            state.roomRecvList = [];
        },
        ADD_ALL_RECV: (state, msg) => {
            state.allRecvList.push(msg);
        },
        ADD_ROOM_RECV: (state, msg) => {
            state.roomRecvList.push(msg);
        },
        TOGGLE_TAB: (state) => {
            if (Object.keys(state.room).length !== 0) {
                state.isAll = state.isAll ? false : true;
            }
        },
        SET_TOGGLE_TAB: (state, flag) => {
            state.isAll = flag;
        },
        SET_GAME_ROOM:(state, room) => {
            state.gameRoom = room;
        },
    },
    actions: {
        roomCreate({ rootState, commit }, roomInfo) {
            createRoomApi(
                { headers: rootState.auth.authHeader, roomInfo },
                ({ data }) => {
                    console.log(data);
                    commit("SET_ROOM", data);
                    let user = {
                        nick: rootState.auth.user.nick,
                        team: 0,
                        host: true,
                        userId: rootState.auth.user.userId,
                        img: rootState.auth.user.img,
                    };
                    commit("INIT_HOST", user);
                    router.push("/waiting/" + data.code);
                },
                (error) => {
                    console.log(error);
                    if (error.response.status == 401){
                        store.dispatch('removeToken')
                        router.push({name: 'login'})
                    }
                }
            );
        },
        leaveRoom({ rootState, commit }, joinInfo) {
            leaveRoomApi(
                { headers: rootState.auth.authHeader, joinInfo },
                () => {
                    commit("DELETE_USER", joinInfo.id);
                },
                (error) => {
                    console.log(error);
                    if (error.response.status == 401){
                        store.dispatch('removeToken')
                        router.push({name: 'login'})
                    }
                }
            );
        },
        joinRoom({ rootState, commit, dispatch }, roomCode) {
            setRoomUserApi(
                {
                    headers: rootState.auth.authHeader,
                    code: roomCode,
                    id: rootState.auth.user.nick,
                },
                ({ data }) => {
                    commit("SET_ROOM", data);
                    router.push("/waiting/" + data.code);
                },
                (error) => {
                    console.log(error);
                    if (error.response.status === 405){
                        refresh(error, store, router)
                        dispatch("joinRoom", roomCode)
                    } else if (error.response.status == 403) {
                        alert("이미 인원이 다 차있어 입장 불가능합니다.");
                    } else if (error.response.status == 406) {
                        alert("이미 해당 아이디가 대기방에 들어가 있습니다.");
                    } else if (error.response.status == 401){
                        refresh(error, store, router);
                        dispatch(this.fetchUserInfo);
                    }
                }
            );
        },
        setGameHistory({ rootState, commit }, roomNo) {
            axios({
              url: API_URL + `/rooms/game?roomNo=${roomNo}`,
              method: 'post',
              headers: rootState.auth.authHeader
            })
            .then( (res) => {
              console.log(res)
              commit('SET_GAME_HISTORY_NO', res.data)
            })
            .catch((e) => {
              console.log(e)
              if (e.response.status == 401){
                store.dispatch('removeToken')
                router.push({name: 'login'})
            }
            })
          },
        endGameHistory({ rootState }, { roomNo, gameHistoryNo }) {
            axios({
              url: API_URL + `/rooms/gameend?roomNo=${roomNo}&gameHistoryNo=${gameHistoryNo}`,
              method: 'post',
              headers: rootState.auth.authHeader
            })
            .then( (res) => {
              console.log(res)
            })
            .catch((e) => {
              console.log(e)
              if (e.response.status == 401){
                store.dispatch('removeToken')
                router.push({name: 'login'})
            }
            })
          },

          setGameScore({ rootState }, score) {
            axios({
                url: API_URL + "/rooms/score",
                method: "post",
                data: score,
                headers: rootState.auth.authHeader,
            })
            .then( (res) => {
              console.log(res)
            })
            .catch((e) => {
              console.log(e)
              if (e.response.status == 401){
                store.dispatch('removeToken')
                router.push({name: 'login'})
            }
            })
        }
    },
};

export default room;

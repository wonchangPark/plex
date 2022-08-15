import { createRoomApi, leaveRoomApi, setRoomUserApi } from "@/api/room.js";
import router from "@/router";
import axios from "axios";
import { API_BASE_URL } from '@/config';

const API_URL = API_BASE_URL + '/api/v1';

const room = {
    namespaced: true,
    state: {
        room: {},
        roomJoin: false,
        users: [],
    },
    getters: {
        roomJoin: state => state.roomJoin
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
        SET_ROOMJOIN: (state) => {state.roomJoin = true},
        SET_ROOMCLOSE: (state) => {
            state.roomJoin = false
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
                }
            );
        },
        joinRoom({ rootState, commit }, roomCode) {
            setRoomUserApi(
                { headers: rootState.auth.authHeader, code: roomCode, id: rootState.auth.user.nick },
                ({ data }) => {
                    commit("SET_ROOM", data);
                    router.push("/waiting/" + data.code);
                },
                (error) => {
                    console.log(error);
                    if (error.response.status == 403) {
                        alert("이미 인원이 다 차있어 입장 불가능합니다.");
                    } else if (error.response.status == 406) {
                        alert("이미 해당 아이디가 대기방에 들어가 있습니다.");
                    }
                }
            );
        },
        setGameHistory({ dispatch, rootState}, { roomNo, score }) {
            axios({
              url: API_URL + `/rooms/game?roomNo=${roomNo}`,
              method: 'post',
              headers: rootState.auth.authHeader
            })
            .then( (res) => {
              console.log(res)
              score.gameHistoryNo = res.data
              dispatch('setGameScore', score)
            })
            .catch((e) => {
              console.log(e)
            })
          },
          setGameScore({ rootState }, score) {
            axios({
              url: API_URL + '/rooms/score',
              method: 'post',
              data: score,
              headers: rootState.auth.authHeader
            })
            .then( (res) => {
              console.log(res)
            })
            .catch((e) => {
              console.log(e)
            })
        }
    },
};

export default room;

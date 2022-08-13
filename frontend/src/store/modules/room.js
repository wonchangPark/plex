import { createRoomApi, leaveRoomApi, setRoomUserApi } from "@/api/room.js";
import router from "@/router";

const room = {
    namespaced: true,
    state: {
        room: {},
        roomJoin: false,
        users: [],
    },
    getters: {},
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
                        isHost: true,
                        token: data.token,
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
                { headers: rootState.auth.authHeader, joinInfo},
                () => {
                    commit("INIT_ROOM");
                    commit("INIT_USERS");
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        joinRoom({ rootState, commit }, roomCode) {
            setRoomUserApi(
                { headers: rootState.auth.authHeader, code: roomCode, id: rootState.auth.user.userId },
                ({ data }) => {
                    commit("SET_ROOM", data);
                    router.push("/waiting/" + data.code);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};

export default room;

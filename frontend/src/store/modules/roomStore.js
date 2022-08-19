import { connectUsers, rooms } from "@/api/room.js";
import {refresh} from "@/api/error"

const roomStore = {
    namespaced: true,
    state: {
        rooms: [],
        lastPage: 1,
        curPage: 1,
        connectUsers: [],
    },
    getters: {},
    mutations: {
        SET_ROOMS: (state, { rooms, lastPage, curPage }) => {
            while (rooms.length < 3) rooms.push({ visible: false });
            state.rooms = rooms;
            state.lastPage = lastPage === 0 ? 1 : lastPage;
            state.curPage = curPage;
        },
        SET_CUR_PAGE: (state, payload) => {
            state.curPage = payload;
        },
        NEXT_CUR_PAGE: (state) => {
            state.curPage += 1;
        },
        PREV_CUR_PAGE: (state) => {
            state.curPage -= 1;
        },
        ADD_CONNECT_USER: (state, payload) => {
            state.connectUsers.push(payload);
        },
        REMOVE_CONNECT_USER: (state, payload) => {
            state.connectUsers = state.connectUsers.filter((item) => item.nick !== payload.nick);
        },
        SET_CONNECT_USER: (state, payload) => {
            state.connectUsers = payload;
        },
    },
    actions: {
        getRooms: ({ commit, rootState, dispatch }, page) => {
            console.log({ page, accessToken: rootState.auth.accessToken });
            rooms(
                { page, accessToken: rootState.auth.accessToken, refreshToken: rootState.auth.refreshToken},
                ({ data }) => {
                    console.log(data);
                    commit("SET_ROOMS", data);
                },
                (error) => {
                    console.log(error);
                    refresh(error)
                    dispatch('getRooms', page)
                }
            );
        },
        getConnectUsers: ({ commit, rootState, dispatch }) => {
            connectUsers(
                { token: rootState.auth.token },
                ({ data }) => {
                    console.log(data);
                    commit("SET_CONNECT_USER", data);
                },
                (error) => {
                    console.log(error);
                    refresh(error)
                    dispatch('getConnectUsers')
                }
            );
        },
    },
};

export default roomStore;

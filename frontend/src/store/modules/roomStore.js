import { rooms } from "@/api/room.js";

const roomStore = {
    namespaced: true,
    state: {
        rooms: [],
        lastPage: 6,
        curPage: 3,
    },
    getters: {},
    mutations: {
        SET_ROOMS: (state, { rooms, lastPage, curPage }) => {
            while (rooms.length < 3) rooms.push({visible: false});
            state.rooms = rooms;
            state.lastPage = lastPage;
            state.curPage = curPage;
            console.log(rooms);
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
    },
    actions: {
        getRooms: ({ commit, rootState }, page) => {
            console.log({ page, token: rootState.auth.token });
            rooms(
                { page, token: rootState.auth.token },
                ({ data }) => {
                    commit("SET_ROOMS", data);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};

export default roomStore;

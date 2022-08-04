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
        SET_ROOMS: (state, { rooms, lastPage }) => {
            state.rooms = rooms;
            state.lastPage = lastPage;
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
        getRooms: ({ commit }, page) => {
            rooms(
                page,
                ({ data }) => {
                    commit("SET_ROOMS", data);
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};

export default roomStore;

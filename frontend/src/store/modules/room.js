import { createRoomApi, leaveRoomApi, setRoomUserApi } from "@/api/room.js";
import router from '@/router';

const room = {
    namespaced: true,
    state: {
        room: {},
        roomJoin: false,
    },
    getters: {},
    mutations: {
        SET_ROOM: (state, room) => {
            state.room = room;
        },
    },
    actions: {
        roomCreate({ rootState, commit }, roomInfo) {
            createRoomApi(
                { token: rootState.auth.token, roomInfo },
                ({ data }) => {
                    commit("SET_ROOM", data);
                    router.push("/waiting/"+ data.token);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        leaveRoom({ rootState }, joinInfo) {
            leaveRoomApi(
                { token: rootState.auth.token, joinInfo },
                ({ data }) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        joinRoom({ rootState, commit }, mySessionId, userName) {
            setRoomUserApi(
                { token: rootState.auth.token, mySessionId, userName },
                ({ data }) => {
                    commit("SET_ROOM", data);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};

export default room;

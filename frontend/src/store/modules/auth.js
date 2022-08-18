import axios from "@/axios";
import router from "@/router";
import { API_BASE_URL } from "@/config";
import { refresh } from "@/api/error";
import store from "@/store";

const API_URL = API_BASE_URL + "/api/v1";
export default {
    state: {
        user: {},
        accessToken: null,
        refreshToken: null,
        authError: null,
        passwordFlag: false,
        nicknameFlag: false,
        idFlag: false,
        rankingList: {},
        loginModal: false,
        myRanking: {},
        userExercise: [],
        userGameInfo: {},
        currentUserImage: {},
    },

    getters: {
        isLoggedIn: (state) => !!state.accessToken,
        loginModal: (state) => state.loginModal,
        getUser: (state) => state.user,
        passwordFlag: (state) => state.passwordFlag,
        nicknameFlag: (state) => state.nicknameFlag,
        idFlag: (state) => state.idFlag,
        rankingList: (state) => state.rankingList,
        authError: (state) => state.authError,
        authHeader: (state) => ({
            Authorization: "Bearer " + state.accessToken,
            Authorization2: "Bearer " + state.refreshToken,
        }),
        userExercise: (state) => state.userExercise,
        userGameInfo: (state) => state.userGameInfo,
        myRanking: (state) => state.myRanking,
        currentUserImage: (state) => state.currentUserImage,
    },

    mutations: {
        SET_USER: (state, user) => (state.user = user),
        SET_LOGINMODAL: (state, loginModal) => (state.loginModal = loginModal),
        SET_PASSWORDFLAG: (state, passwordFlag) => (state.passwordFlag = passwordFlag),
        SET_NICKNAMEFLAG: (state, nicknameFlag) => (state.nicknameFlag = nicknameFlag),
        SET_IDFLAG: (state, idFlag) => (state.idFlag = idFlag),
        SET_RANKINGLIST: (state, rankingList) => (state.rankingList = rankingList),
        SET_MYRANKING: (state, myRanking) => (state.myRanking = myRanking),
        SET_ACCESSTOKEN: (state, accessToken) => (state.accessToken = accessToken),
        SET_REFRESHTOKEN: (state, refreshToken) => (state.refreshToken = refreshToken),
        SET_AUTH_HEADER: (state, authHeader) => (state.authHeader = authHeader),
        SET_AUTH_ERROR: (state, error) => (state.authError = error),
        SET_USER_EXERCISE: (state, exerciseInfo) => (state.userExercise = exerciseInfo),
        SET_GAME_INFO: (state, gameInfo) => (state.userGameInfo = gameInfo),
        SET_CURRENT_USER_IMAGE: (state, currentUserImage) => (state.currentUserImage = currentUserImage),
    },

    actions: {
        saveToken({ commit }, { accessToken, refreshToken }) {
            commit("SET_ACCESSTOKEN", accessToken);
            commit("SET_REFRESHTOKEN", refreshToken);
            commit("SET_AUTH_HEADER", {
                Authorization: "Bearer " + accessToken,
                Authorization2: "Bearer " + refreshToken,
            });
        },

        removeToken({ commit }) {
            commit("SET_ACCESSTOKEN", "");
            commit("SET_REFRESHTOKEN", "");
        },

        fetchUserInfo({ commit, getters, dispatch }) {
            if (getters.isLoggedIn) {
                axios({
                    url: API_URL + "/users/me",
                    method: "get",
                    headers: getters.authHeader,
                })
                    .then((res) => {
                        console.log("user", res.data);
                        const user = {
                            no: res.data.no,
                            userId: res.data.userId,
                            nick: res.data.nick,
                            email: res.data.email,
                            totalScore: res.data.totalScore,
                            img: res.data.img,
                        };
                        commit("SET_USER", user);
                    })
                    .catch((error) => {
                        console.log(error);
                        refresh(error, store, router, this.fetchUserInfo);
                        dispatch(this.fetchUserInfo);
                    });
            }
        },

        fetchRankingList({ commit, getters }) {
            axios({
                url: API_URL + "/rank",
                method: "get",
                headers: getters.authHeader,
            })
                .then((res) => {
                    const rankingList = res.data;
                    commit("SET_RANKINGLIST", rankingList);
                })
                .catch((err) => {
                    console.log(getters.isLoggedIn);
                    console.error(err.response.data);
                });
        },

        fetchMyRanking({ commit, getters }, no) {
            if (getters.isLoggedIn) {
                axios({
                    url: API_URL + "/rank/" + no,
                    method: "get",
                    headers: getters.authHeader,
                })
                    .then((res) => {
                        console.log("myranking", res);
                        const myRanking = res.data;
                        commit("SET_MYRANKING", myRanking);
                    })
                    .catch((err) => {
                        console.error(err.response.data);
                    });
            }
        },

        fetchExerciseInfo({ getters, commit }) {
            if (getters.isLoggedIn) {
                axios({
                    url: API_URL + "/users/exercise",
                    method: "get",
                    headers: getters.authHeader,
                })
                    .then((res) => {
                        console.log("ex", res);
                        const exerciseInfo = res.data;
                        commit("SET_USER_EXERCISE", exerciseInfo);
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                    });
            }
        },

        fetchGameInfo({ getters, commit }) {
            if (getters.isLoggedIn) {
                axios({
                    url: API_URL + "/users/totalgame",
                    method: "get",
                    headers: getters.authHeader,
                })
                    .then((res) => {
                        console.log("tot", res);
                        const gameInfo = res.data;
                        commit("SET_GAME_INFO", gameInfo);
                    })
                    .catch((err) => {
                        console.err(err.response.data);
                    });
            }
        },

        changeImg({ getters, dispatch }, img) {
            if (getters.isLoggedIn) {
                axios({
                    url: API_URL + "/users/image",
                    method: "post",
                    data: img,
                    headers: getters.authHeader,
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.error(err.response.data);
                        refresh(err, store, router, this.changeImg);
                        dispatch("changeImg", img);
                    });
            }
        },

        fetchImg({ getters, commit }, nick) {
            axios({
                url: API_URL + "/users/image",
                method: "get",
                params: {
                    nick: nick,
                },
                headers: getters.authHeader,
            })
                .then((res) => {
                    console.log(res);
                    const imgInfo = res.data;
                    commit("SET_CURRENT_USER_IMAGE", imgInfo);
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        },

        login({ commit, dispatch }, credentials) {
            axios({
                url: API_URL + "/auth/login",
                method: "post",
                data: credentials,
            })
                .then((res) => {
                    console.log(res.data);
                    const user = {
                        no: res.data.no,
                        userId: res.data.userId,
                        nick: res.data.nick,
                        email: res.data.email,
                        totalScore: res.data.totalScore,
                        img: res.data.img,
                    };
                    const accessToken = res.data.accessToken;
                    const refreshToken = res.data.refreshToken;
                    dispatch("saveToken", { accessToken, refreshToken });
                    commit("SET_USER", user);
                    dispatch("socketStore/connectSocket");
                })
                .catch((err) => {
                    console.error(err.response.data);
                    commit("SET_AUTH_ERROR", err.response.data);
                    alert("아이디와 비밀번호를 확인해주세요");
                });
        },

        passwordCheck({ commit, dispatch }, credentials) {
            commit("SET_PASSWORDFLAG");
            dispatch("signup", credentials);
        },

        nicknameCheck({ commit }, credentials) {
            axios({
                url: API_URL + "/users/nickname/check",
                method: "post",
                data: credentials,
            })
                .then((res) => {
                    console.log(res);
                    commit("SET_NICKNAMEFLAG", true);
                })
                .catch((err) => {
                    console.error(err.response.data);
                    commit("SET_NICKNAMEFLAG", false);
                });
        },

        idCheck({ commit }, credentials) {
            axios({
                url: API_URL + "/users/id/check",
                method: "post",
                data: credentials,
            })
                .then((res) => {
                    console.log(res);
                    commit("SET_IDFLAG", true);
                })
                .catch((err) => {
                    console.log(err.response.data);
                    commit("SET_IDFLAG", false);
                });
        },

        signup({ commit }, credentials) {
            axios({
                url: API_URL + "/users/register",
                method: "post",
                data: credentials,
            })
                .then((res) => {
                    console.log(res);
                    router.push({ name: "login" });
                })
                .catch((err) => {
                    console.log(err.response.data);
                    commit("SET_AUTH_ERROR", err.response.data);
                });
        },

        logout({ commit, getters, dispatch }) {
            axios({
                url: API_URL + "/auth/logout",
                method: "post",
                headers: getters.authHeader,
            }).then((res) => {
                console.log(res);
                dispatch("socketStore/disconnectSocket");
                dispatch("removeToken");
                commit("SET_USER", {});
                router.push({ name: "home" }).error((err) => {
                    console.log(err);
                });
            });
        },
    },
};

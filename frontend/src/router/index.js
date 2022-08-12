import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "@/views/HomeView.vue";
import Login from "@/views/LoginView.vue";
import WaitingRoom from "@/views/WaitingRoomView.vue";

import GameRoom from "@/views/RoomView.vue";
import RunningRoom from "@/views/RunningRoomView.vue";

// import GameRoom from "@/views/RunningRoomView.vue";
// import RunningRoom from "@/views/RoomView.vue";
import RoomList from "@/components/WaitingRoom/RoomList.vue";
import RoomUserList from "@/components/WaitingRoom/RoomUserList.vue";

import Mypage from "@/views/MypageView.vue";
import SignUp from "@/views/SignupView.vue";
import Rank from "@/views/RankView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/waiting",
        component: WaitingRoom,
        children: [
            { path: "", name: "waiting", component: RoomList },
            { path: ":roomId", name: "RoomUserList", component: RoomUserList },
        ],
    },
    {
        path: "/room",
        name: "gameroom",
        component: GameRoom,
    },
    {
        path: "/mypage",
        name: "mypage",
        component: Mypage,
    },
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
    },
    {
        path: "/rank",
        name: "rank",
        component: Rank,
    },
    {
        path: "/runningroom",
        name: "runningroom",
        component: RunningRoom,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    // 이전 페이지에서 발생한 에러메시지 삭제
    store.commit("SET_AUTH_ERROR", null);

    const { isLoggedIn } = store.getters;

    const noAuthPages = ["home", "login", "signup"];

    const isAuthRequired = !noAuthPages.includes(to.name);

    if (isAuthRequired && !isLoggedIn) {
        next({ name: "login" });
    } else {
        next();
    }

    if (!isAuthRequired && isLoggedIn) {
        next({ name: "waiting" });
    }
});

export default router;

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import WaitingRoom from '@/views/WaitingRoomView.vue'
import GameRoom from '@/views/RoomView.vue'
import Mypage from '@/views/MypageView.vue'
import SignUp from '@/views/SignupView.vue'
import Rank from '@/views/RankView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/waiting',
    name: 'waiting',
    component: WaitingRoom
  },
  {
    path: '/room',
    name: 'gameroom',
    component: GameRoom
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/wait',
    name: 'wait',
    component: WaitingRoom
  },
  { 
    path: '/rank',
    name: 'rank',
    component: Rank
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

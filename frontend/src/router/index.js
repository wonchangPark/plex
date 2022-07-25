import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import Signup from '@/views/SignupView.vue'
import WaitingRoom from '@/views/WaitingRoomView.vue'
import Room from '@/views/RoomView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/waiting',
    name: 'waiting',
    component: WaitingRoom
  },
  {
    path: '/room',
    name: 'room',
    component: Room
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

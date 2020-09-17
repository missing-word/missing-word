import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'
import Lobby from '../views/Lobby.vue'
import Waiting from '../views/Waiting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/waiting',
    name: 'Waiting',
    component: Waiting,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

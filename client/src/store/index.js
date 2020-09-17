import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    SOCKET_firstTurn({ state }, payload) {
      if (state.username === payload) {
        router.push({ name: 'Play' })
      } else {
        router.push({ name: 'Waiting' })
      }
    }
  },
  modules: {
  }
})

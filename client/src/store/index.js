import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isYourTurn: true,
    isAnswer: false,
    word: [],
    missingWord: [],
    answer: '',
    username: '',
    points: 0

  },
  mutations: {
    SET_WORD (state, payload) {
      state.word = payload
    },
    SET_ANSWER () {
      state.answer = payload
    },
    SET_IS_ANSWER (state, payload) {
      state.isAnswer = payload
    },
    SET_IS_YOUR_TURN (state, payload) {
      state.isYourTurn = payload
    },
    SOCKET_missingWord (state, payload) {
      state.missingWord = playload
    },
    SOCKET_getPoint (state, payload) {
      state.points = payload.points
    },
    SOCKET_firstTurn (state, playload) {
      if(playload === state.username){
        state.isYourTurn = true
      }
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    setWord ({ commit }, payload) {
      let result = []
      for(let i = 0; i < payload.length; i++){
        result.push(payload[i])
      }
      commit('SET_WORD', result)
    },
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

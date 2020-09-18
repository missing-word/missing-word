import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notif: true,
    isYourTurn: true,
    isAnswer: false,
    word: [],
    missingWord: [],
    answer: '',
    username: '',
    points: 0

  },
  mutations: {
    SOCKET_notif (state, payload) {
      state.notif = false
    },
    SOCKET_trueWord (state, payload) {
      state.word = payload
    },
    SET_ANSWER () {
      state.answer = payload
    },
    SET_IS_ANSWER (state, payload) {
      state.isAnswer = payload
    },
    SOCKET_missingWord (state, payload) {
      console.log(payload, 'dari mutations')
      state.missingWord = payload
    },
    SOCKET_getPoint (state, payload) {
      state.points = payload.points
    },
    SOCKET_firstTurn (state, payload) {
      if(payload !== state.username){
        state.isYourTurn = false
        // state.turn += payload.username
      }else{
        state.isYourTurn = true
      }
    },
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
    // setWord ({ commit }, payload) {
    //   let result = []
    //   for(let i = 0; i < payload.length; i++){
    //     result.push(payload[i])
    //   }
    //   commit('SET_WORD', result)
    // }
    // SOCKET_firstTurn({ state }, payload) {
    //   console.log(payload)
    //   if (state.username !== payload) {
    //     state.commit('SET_IS_YOUR_TURN', false)
    //   } else {
    //     state.commit('SET_IS_YOUR_TURN', true)
    //   }
    // }
  },
  modules: {
  }
})

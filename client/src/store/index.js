import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Swal from 'sweetalert2'

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
    points: 0,
    nilaiLawanA: 0,
    nilaiLawanB: 0,
    // letStart: false

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
    },
    SOCKET_salah (state,payload) {
      state.nilaiLawanA += 10
      Swal.fire(payload)
    },
    SOCKET_benar (state,payload) {
      state.nilaiLawanB += 10
      Swal.fire(payload)
    },
    SET_EMPTY_DATA (state,payload) {
      state.missingWord = payload
    }
    // SOCKET_letStart (state, payload){
    
    // }
  },
  actions: {
    SOCKET_notifBenar ({ commit }, payload) {
     Swal.fire(payload)
    },
    SOCKET_notifSalah ({ commit }, payload) {
      Swal.fire(payload)
     }
  },
  modules: {
  }
})

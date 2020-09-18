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
    nilaiLawan: 0,
    letStart: false

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
      state.nilaiLawan += 10
      Swal.fire(payload)
    },
    SOCKET_benar (state,payload) {
      state.nilaiLawan += 10
      Swal.fire(payload)
    },
    SET_EMPTY_DATA (state,payload) {
      state.missingWord = payload
    },
    SOCKET_letStart (state, payload){
      state.letStart = true
    },
    SOCKET_changeTurn (state, payload) {
      if(state.username === payload){
        state.isYourTurn = true
      }else{
        state.isYourTurn = false
      }
    },
    SOCKET_startGame (state, payload){
      state.letStart = payload
    },
    gameOver (state, payload) {
      state.notif = true
      state.isYourTurn = true
      state.isAnswer = false
      state.word = []
      state.missingWord = []
      state.answer = ''
      state.username = ''
      state.points = 0
      state.nilaiLawan = 0
      state.letStart = false
    }
  },
  actions: {
    SOCKET_notifBenar ({ commit }, payload) {
     Swal.fire(payload)
    },
    SOCKET_notifSalah ({ commit }, payload) {
      Swal.fire(payload)
    },
    SOCKET_gameOver ({ commit }, payload) {
      Swal.fire(payload)
      .then((result) => {
        if(result.isConfirmed){
          router.push({ name: 'Home'})
          commit('gameOver')
        }
      })
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import VueSocketIO from 'vue-socket.io'

// const song = (require('<songs file>'))
// if (song){
//   const audio = new Audio(song)
//   audio.play()
// }

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3001',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

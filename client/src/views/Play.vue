<template>
  <div>
    <h1 class="mb-3">Hey {{$store.state.username}}, Your Score: {{$store.state.points}}</h1>
    <h1 class="mb-3">Your Rival Score: {{$store.state.points}}</h1>
    <h2 v-if="$store.state.isYourTurn === true"> It's Your Turn</h2>
      <div class="container d-flex" v-if="$store.state.isAnswer === false">
        <Card1 v-for="(alphabet, i) in alphabets" :key="i" :alphabet="alphabet"></Card1>
      </div>
      <div class="container d-flex" v-if="$store.state.isAnswer === true">
        <Card2 v-for="(alphabet1, i) in questionWords" :key="i" :alphabet1="alphabet1"></Card2>
      </div>
    <div class="container mt-5" v-if="$store.state.isYourTurn === true"> 
      <div class="input-group">
        <input type="text" class="form-control" v-model="word" placeholder="Write your word here ..."/>
        <button type="submit" class="btn btn-primary btn-block mt-3" @click.prevent="sendWord">Submit</button>
      </div>
    </div>
     <div class="container mt-5" v-if="$store.state.isYourTurn === false">
       <p v-if="$store.state.notif === true">lawan sedang mengetik soal untuk anda ...</p>
      <div class="input-group">
        <input type="text" class="form-control" v-model="answer" placeholder="Write your answer here ..." />
        <button type="submit" class="btn btn-primary btn-block mt-3" @click.prevent="sendAnswer">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Card1 from "../components/Card1";
import Card2 from "../components/Card2";
export default {
  name: "Play",
  data() {
    return {
      word: "",
      answer: "",
    };
  },
  components: {
    Card1,
    Card2,
  },
  computed: {
    questionWords () {
      return this.$store.state.word
    },
    alphabets () {
      return this.$store.state.missingWord
    }
  },
  methods: {
    sendWord() {
      this.$socket.emit('word', this.word)
      this.word = ''
      this.$socket.emit('notif')
    },
    sendAnswer() {
      let payload = {
        username: this.$store.state.username,
        message: this.answer
      }
      this.$socket.emit('answer', payload)
      this.$store.commit("SET_IS_ANSWER", true);
      setTimeout(this.stopShowAnswer, 3000)
      // clearInterval(this.stopShowAnswer)
    },
    stopShowAnswer () {
      this.$store.commit("SET_IS_ANSWER", false)
      // this.$store.commit("SET_IS_ANSWER", true);
      this.answer = ''
    }
  },
};
</script>

<style>
</style>
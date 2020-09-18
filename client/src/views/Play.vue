<template>
  <div>
    <h2 class="mb-3 text-center">Hey {{$store.state.username}}, Your Score: {{$store.state.points}}</h2>
    <h2 class="mb-3 text-center">Your Rival Score: {{$store.state.nilaiLawan}}</h2>
    <h3
      v-if="$store.state.isYourTurn === true"
      class="text-center"
    >It's Your Turn! Send word to rival</h3>
    <div class="container d-flex" v-if="$store.state.isAnswer === false">
      <Card1 v-for="(alphabet, i) in alphabets" :key="i" :alphabet="alphabet"></Card1>
    </div>
    <div class="container d-flex" v-if="$store.state.isAnswer === true">
      <Card2 v-for="(alphabet1, i) in questionWords" :key="i" :alphabet1="alphabet1"></Card2>
    </div>
    <div class="container mt-5" v-if="$store.state.isYourTurn === true">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="word"
          placeholder="Write your word here ..."
        />
        <button
          type="submit"
          class="btn btn-primary btn-block mt-3"
          @click.prevent="sendWord"
        >Send Word</button>
      </div>
    </div>
    <div class="container mt-5" v-if="$store.state.isYourTurn === false">
      <p v-if="$store.state.notif === true">wait for your rival's word ...</p>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="answer"
          placeholder="Write your answer here ..."
        />
        <button
          type="submit"
          class="btn btn-primary btn-block mt-3"
          @click.prevent="sendAnswer"
        >Send Answer</button>
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
    questionWords() {
      return this.$store.state.word;
    },
    alphabets() {
      return this.$store.state.missingWord;
    },
  },
  methods: {
    sendWord() {
      this.$socket.emit("word", this.word);
      this.word = "";
      this.$socket.emit("notif");
    },
    sendAnswer() {
      let payload = {
        username: this.$store.state.username,
        message: this.answer,
      };
      this.$socket.emit("answer", payload);
      this.$store.commit("SET_IS_ANSWER", true);
      setTimeout(this.stopShowAnswer, 3000);
      // clearInterval(this.stopShowAnswer)
    },
    stopShowAnswer() {
      this.$store.commit("SET_EMPTY_DATA", []);
      this.$store.commit("SET_IS_ANSWER", false);
      // this.$store.commit("SET_IS_ANSWER", true);
      this.answer = "";
    },
  },
};
</script>

<style>
/* * {
  border: 1px solid red;
} */
</style>
<template>
  <div class="lobby-wrapper d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1>Are you ready?</h1>
      <button class="btn btn-dark" @click="ready">Ready</button>
      <button v-if="$store.state.letStart === true" class="btn btn-dark ml-3" @click.prevent="start">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lobby",

  methods: {
    ready() {
      this.$socket.emit("ready", {
        username: this.$store.state.username,
        status: "ready",
        points: 0
      });
    },
    start () {
      this.$socket.emit('start')
      // setInterval(this.letsPlay, 3000);
      this.letsPlay()
    },
    letsPlay () {
      this.$router.push({ name: "Play" })
    }
  },
};
</script>

<style>
.lobby-wrapper {
  height: 100vh;
}
</style>
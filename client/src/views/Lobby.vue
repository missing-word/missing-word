<template>
  <div class="lobby-wrapper d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1>Are you ready?</h1>
      <button class="btn btn-dark" @click="ready">Ready</button>
      <button class="btn btn-dark" @click.prevent="start">Start</button>
    </div>
     <button class="btn btn-dark" @click.prevent="Start">start</button>
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
      // setInterval(this.letsPlay, 3000);
    },
    start () {
      this.$socket.emit('start')
      setInterval(this.letsPlay, 3000);
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
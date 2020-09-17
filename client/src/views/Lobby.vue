<template>
  <div class="lobby-wrapper d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1>Are you ready?</h1>
      <button class="btn btn-dark" @click="ready">Ready</button>
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
      });
    },
  },
};
</script>

<style>
.lobby-wrapper {
  height: 100vh;
}
</style>
<template>
  <div class="container-fluid background">
    <div class="input-wrapper flex-column d-flex justify-content-center align-items-center">
      <div class="row">
        <div class="col d-flex justify-content-center">
          <h1 class="mt-2 mb-5">Missing Word</h1>
        </div>
      </div>
      <div>
        <input
          class="input-username"
          v-model="username"
          placeholder="input your username..."
          type="text"
          @keyup.enter="inputUsername"
        />
      </div>
      <div class="ml-2">{{message}}</div>
      <h2 class="mt-3">How to play</h2>
      <ol>
        <li>Input your username</li>
        <li>Click ready</li>
        <li>Wait for your rival to ready</li>
        <li>Then click start when the start button appear</li>
        <li>Wait for server to random who first turn</li>
        <li>If your turn is coming, send your word to your rival at least 5 characters</li>
        <li>The game will over when both player has send 2 word and guessed 2 word</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      username: "",
      message: "",
    };
  },

  methods: {
    inputUsername() {
      this.$store.commit("setUsername", this.username);
      localStorage.setItem("username", this.username);
      this.$router.push({ name: "Lobby" });
    },
  },

  watch: {
    username(newVal, oldVal) {
      this.message = "Click enter";
    },
  },
};
</script>

<style lang="scss">
.background {
  background-color: #95a5a6;
  height: 100vh;
}

.input-wrapper {
  height: 100vh;
}

.input-username {
  background-color: #95a5a6;
  border: 0;
  width: 500px;
  font-size: 50px;
  border-bottom: 1px solid black;
}

.input-username:focus {
  border: 0;
}
</style>

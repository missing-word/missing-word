<template>
  <div class="container-fluid background">
    <div class="input-wrapper d-flex justify-content-center align-items-center">
      <input
        class="input-username"
        v-model="username"
        placeholder="input your username..."
        type="text"
        @keyup.enter="inputUsername"
      />
      <div class="ml-2">{{message}}</div>
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

<template>
  <div class="container">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card" style="width: 8rem; border-radius: 10px;">
            <div class="card-body">
              <h5 class="card-title">{{alphabet}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["alphabet"],
};
</script>

<style lang="scss" scoped>
</style>
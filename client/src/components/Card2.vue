<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card" style="width: 3rem; border-radius: 10px;">
          <div class="card-body p-3">
            <h5 class="card-title text-center mb-0">{{alphabet1}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["alphabet1"],
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div
    class="spinner"
    data-test="spinner-container"
    :style="{ width: size, height: size }"
  >
    <div class="spinner__circle" data-test="spinner-circle"></div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "40px",
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/loader";
</style>

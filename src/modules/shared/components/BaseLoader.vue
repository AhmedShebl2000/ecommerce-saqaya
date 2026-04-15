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

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner__circle {
  width: 100%;
  height: 100%;
  border: 3px solid #f5f5f5;
  border-top-color: #db4444;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

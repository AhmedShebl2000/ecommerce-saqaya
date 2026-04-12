<template>
  <div class="error">
    <p class="error__message">{{ message }}</p>
    <base-button v-if="retryable" class="error__retry" @click="$emit('retry')">
      Try again
    </base-button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "Something went wrong. Please try again.",
    },
    retryable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["retry"],
};
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px 20px;
  text-align: center;
}

.error__message {
  color: #db4444;
  font-size: 16px;
}
</style>

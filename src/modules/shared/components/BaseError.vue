<template>
  <div class="error">
    <p class="error__message" data-test="error_message">{{ message }}</p>
    <base-button
      v-if="retryable"
      class="error__retry"
      data-test="retry-button"
      @click="$emit('retry')"
    >
      Try again
    </base-button>
  </div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

defineProps({
  message: {
    type: String,
    default: "Something went wrong. Please try again.",
  },
  retryable: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["retry"]);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/error";
</style>

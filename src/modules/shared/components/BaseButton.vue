<template>
  <button
    data-test="button"
    v-if="!link"
    @click="$emit('click')"
    :disabled="disabled"
    :class="type"
  >
    <slot></slot>
  </button>
  <router-link v-else :to="to">
    <slot></slot>
  </router-link>
</template>

<script setup>
defineProps({
  link: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: "/",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "normal",
  },
});

defineEmits(["click"]);
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/buttons";
</style>

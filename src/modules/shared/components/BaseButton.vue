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

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: "normal",
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/buttons";
</style>

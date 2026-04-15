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

<style scoped>
button,
a {
  display: inline-flex;
  text-decoration: none;
  padding: 16px 48px;
  font: inherit;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 0.5rem;
  border: none;
}

a:hover,
a:active,
button:hover,
button:active {
  outline: none;
  border-color: white;
}

a,
button {
  background-color: #db4444;
}

.disabled {
  background-color: #fff;
}

.outline {
  background-color: white;
  color: black;
  border: 1px solid black;
}
</style>

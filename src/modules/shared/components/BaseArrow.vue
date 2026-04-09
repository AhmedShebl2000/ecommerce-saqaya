<template>
  <div v-if="type === 'right'" class="arrow-container" @click="$emit('click')">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 12H20M20 12L13 5M20 12L13 19"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
  <div v-else class="arrow-container" @click="$emit('click')">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5L4 12L11 19M4 12H20"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, required: true },
  },
};
</script>

<style scoped>
.arrow-container {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.arrow-container svg {
  background: transparent;
}
</style>

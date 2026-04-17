<template>
  <div class="card" :class="{ 'card--different-background': targetId === id }">
    <div>
      <slot></slot>
    </div>
    <p class="card__amount">{{ amount }}k</p>
    <p class="card__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "amount", "subtitle"],
  data() {
    return {
      targetId: 2,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/basesalescard";
</style>

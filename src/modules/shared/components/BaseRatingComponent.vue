<template>
  <div class="rating">
    <div class="stars">
      <span v-for="n in 5" :key="n" class="star" data-test="star-item">
        <span class="star-bg">★</span>
        <span class="star-fill" :style="{ width: getFill(n) + '%' }">★</span>
      </span>
    </div>

    <div v-if="ratingCount" class="count" data-test="count-rating">
      ({{ ratingCount }})
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

function getFill(starIndex) {
  const diff = props.rating - (starIndex - 1);

  if (diff >= 1) return 100;
  if (diff > 0) return diff * 100;
  return 0;
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/rating";
</style>

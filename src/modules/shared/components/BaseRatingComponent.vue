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

<script>
export default {
  name: "BaseRating",
  props: {
    rating: {
      type: Number,
      required: true,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getFill(starIndex) {
      const diff = this.rating - (starIndex - 1);

      if (diff >= 1) return 100;
      if (diff > 0) return diff * 100;
      return 0;
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stars {
  display: flex;
}

.star {
  position: relative;
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 18px;
}

.star-bg,
.star-fill {
  position: absolute;
  top: 0;
  left: 0;
}

.star-bg {
  color: #ddd;
}

.star-fill {
  color: #f5a623;
  overflow: hidden;
  white-space: nowrap;
}

.count {
  font-size: 14px;
  color: #777;
}
</style>

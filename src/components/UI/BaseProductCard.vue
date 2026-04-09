<template>
  <div class="card" @click="$emit('click')">
    <div class="card__image">
      <img :src="image" alt="product image" />
    </div>
    <p class="card__text">{{ title }}</p>
    <div class="card__price-rating">
      <span class="card__price">${{ price }}</span>
      <base-rating-component
        :rating="rating"
        :ratingCount="ratingCount"
      ></base-rating-component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    ratingCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};
</script>

<style scoped>
.card {
  width: 270px;
  height: 322px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  border-radius: 4px;
  cursor: pointer;
}

.card__price-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card__image {
  width: 270px;
  height: 250px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__image img {
  width: 270px;
  height: 250px;
}
</style>

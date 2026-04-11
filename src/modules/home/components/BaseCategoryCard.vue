<template>
  <div class="category-card" @click="handleGetProductsByCategory">
    <div class="category-card__image-container" v-html="image"></div>
    <p class="category-card__title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["image", "title", "category"],
  methods: {
    handleGetProductsByCategory() {
      this.$router.push(`/products?category=${this.category}`);
    },
  },
};
</script>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  width: 219px;
  height: 145px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
}

.category-card:hover {
  background: #db4444;
  color: white;
}

.category-card__image-container {
  max-width: 50px;
  max-height: 50px;
}

.category-card__image-container img {
  max-width: 50px;
  max-height: 50px;
}

.category-card__title {
  font-size: 16px;
  font-weight: 400;
}
</style>

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

<style lang="scss" scoped>
@use "@/assets/styles/components/category-card";
</style>

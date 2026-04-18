<template>
  <div class="category-card" @click="handleGetProductsByCategory">
    <div class="category-card__image-container" v-html="image"></div>
    <p class="category-card__title">{{ title }}</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps(["image", "title", "category"]);

function handleGetProductsByCategory() {
  router.push(`/products?category=${props.category}`);
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/category-card";
</style>

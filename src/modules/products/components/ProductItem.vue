<template>
  <base-product-card
    @click="handleOpenProduct"
    :id="id"
    :image="images[0]"
    :title="title"
    :price="price"
    :discountPercentage="discountPercentage"
    :rating="rating"
    :ratingCount="ratingCount"
  ></base-product-card>
</template>

<script setup>
import { slugify } from "@/mixins/slugify";
import { useProductsStore } from "../store/products";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const productsStore = useProductsStore();

const props = defineProps([
  "id",
  "images",
  "title",
  "price",
  "discountPercentage",
  "rating",
  "ratingCount",
]);

const slug = computed(() => {
  return slugify(props.title);
});

function handleOpenProduct() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const targetPath = `/products/${props.id}/${slug.value}`;
  productsStore.setSelectedProduct(props.id);

  if (route.path === targetPath) return;
  router.push(`/products/${props.id}/${slug.value}`);
}
</script>

<style lang="scss" scoped></style>

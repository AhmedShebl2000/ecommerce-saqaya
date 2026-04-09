<template>
  <base-product-card
    @click="handleOpenProduct"
    :id="id"
    :image="images[0]"
    :title="title"
    :price="price"
    :rating="rating"
    :ratingCount="ratingCount"
  ></base-product-card>
</template>

<script>
import { slugify } from "@/helpers/slugify";

export default {
  props: ["id", "images", "title", "price", "rating", "ratingCount"],
  computed: {
    slug() {
      return slugify(this.title);
    },
  },
  methods: {
    handleOpenProduct() {
      this.$store.commit("products/setSelectedProduct", this.id);
      this.$router.push(`/products/${this.slug}`);
    },
  },
};
</script>

<style></style>

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

<script>
import { slugify } from "@/mixins/slugify";

export default {
  props: [
    "id",
    "images",
    "title",
    "price",
    "discountPercentage",
    "rating",
    "ratingCount",
  ],
  computed: {
    slug() {
      return slugify(this.title);
    },
  },
  methods: {
    handleOpenProduct() {
      this.$store.commit("products/SET_SELECTED_PRODUCT", this.id);
      this.$router.push(`/products/${this.slug}`);
    },
  },
};
</script>

<style></style>

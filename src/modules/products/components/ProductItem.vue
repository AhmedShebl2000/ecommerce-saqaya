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
      window.scrollTo({ top: 0, behavior: "smooth" });
      const targetPath = `/products/${this.id}/${this.slug}`;
      this.$store.commit("products/SET_SELECTED_PRODUCT", this.id);

      if (this.$route.path === targetPath) return;
      this.$router.push(`/products/${this.id}/${this.slug}`);
    },
  },
};
</script>

<style></style>

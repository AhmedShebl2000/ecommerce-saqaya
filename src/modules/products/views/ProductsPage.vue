<template>
  <div>
    <base-bread-crumb :items="breadcrumbItems"></base-bread-crumb>
    <section id="explore-out-products" class="products-page">
      <div class="products-page__header">
        <h2 class="products-page__title">Explore our products</h2>
        <div class="products-page__filter">
          <p class="products-page__filter-label">Sort by</p>
          <sort-dropdown
            class="products-page__filter-select"
            :sortBy="sortBy"
            @handleFetchSortedProducts="handleFetchSortedProducts"
          ></sort-dropdown>
        </div>
      </div>

      <div v-if="loading" class="products-page__loading">
        <base-loader size="48px"></base-loader>
      </div>

      <base-error
        v-else-if="error"
        :message="error"
        @retry="handleRetry"
      ></base-error>

      <ul v-else class="products-page__grid">
        <li
          v-for="product in products"
          :key="product.id"
          class="products-page__item"
        >
          <product-item
            :id="product.id"
            :images="product.images"
            :title="product.title"
            :price="product.price"
            :rating="product.rating"
            :ratingCount="product.reviews?.length || 0"
          ></product-item>
        </li>
      </ul>
      <div class="products-page__button-container">
        <div class="products-page__load-more">
          <base-loader v-if="loadingMore" size="32px"></base-loader>
        </div>
        <base-button v-if="!disabled" :link="false" @click="handleLoadMore">
          Load more...
        </base-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ProductItem from "@/modules/products/components/ProductItem.vue";
import SortDropdown from "../components/SortDropdown.vue";
import { useProductsStore } from "../store/products";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useFetchProducts } from "@/composables/useFetchProducts";
import { useProductsSorting } from "@/composables/useProductsSorting";

const route = useRoute();

const productsStore = useProductsStore();

const { loading, loadingMore, error, offset, getProducts, handleLoadMore } =
  useFetchProducts();

const { products, sortBy } = useProductsSorting();

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const category = route.query.category as string | undefined;
  getProducts({ limit: 12, skip: 0, category });
});

const totalProducts = computed(() => {
  return productsStore.totalProducts;
});

const disabled = computed(() => {
  if (!totalProducts.value) return false;
  return products.value.length >= totalProducts.value;
});

function handleRetry() {
  getProducts({
    limit: 12,
    skip: 0,
    category: route.query.category as string | undefined,
  });
}

const breadcrumbItems = [
  { id: 1, label: "Home", to: "/" },
  {
    id: 2,
    label: "Products",
  },
];

watch(
  () => route.query.category,
  (newCategory) => {
    offset.value = 0;
    sortBy.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProducts({
      limit: 12,
      skip: 0,
      category: newCategory as string | undefined,
    });
  }
);

function handleFetchSortedProducts(value: string) {
  sortBy.value = value;
  const category = route.query.category as string | undefined;
  getProducts({ limit: 0, skip: 0, category });
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/products";
</style>

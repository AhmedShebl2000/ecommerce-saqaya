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
        @retry="
          getProducts({ limit: 12, skip: 0, category: route.query.category })
        "
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

<script setup>
import ProductItem from "@/modules/products/components/ProductItem.vue";
import SortDropdown from "../components/SortDropdown.vue";
import { useProductsStore } from "../store/products";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const productsStore = useProductsStore();

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const category = route.query.category;
  getProducts({ limit: 12, skip: 0, category });
});

const offset = ref(0);
const sortBy = ref("");
const loading = ref(false);
const loadingMore = ref(false);
const error = ref(null);

const products = computed(() => {
  const products = productsStore.products;

  let filteredProducts;
  switch (sortBy.value) {
    case "Highest Rating": {
      filteredProducts = products
        .slice()
        .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    }
    case "Low to high": {
      filteredProducts = products
        .slice()
        .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    }
    case "High to low": {
      filteredProducts = products
        .slice()
        .sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    }
    case "discount": {
      filteredProducts = products
        .slice()
        .sort(
          (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
        );
      break;
    }
    case "brand": {
      filteredProducts = products.slice().sort((a, b) => {
        const brandA = a.brand ?? "";
        const brandB = b.brand ?? "";
        return brandA.localeCompare(brandB);
      });
      break;
    }
    case "category": {
      filteredProducts = products.slice().sort((a, b) => {
        const categoryA = a.category ?? "";
        const categoryB = b.category ?? "";
        return categoryA.localeCompare(categoryB);
      });
      break;
    }
    default:
      filteredProducts = products;
  }

  return filteredProducts;
});

const totalProducts = computed(() => {
  return productsStore.totalProducts;
});

const disabled = computed(() => {
  if (!totalProducts.value) return false;
  return products.value.length >= totalProducts.value;
});

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
    getProducts({ limit: 12, skip: 0, category: newCategory });
  }
);

async function getProducts({ limit, skip, category }) {
  if (skip === 0) {
    loading.value = true;
    error.value = null;
  } else {
    loadingMore.value = true;
  }
  try {
    await productsStore.fetchProducts({ limit, skip, category });
  } catch (error) {
    error.value = "Failed to load products. Please try again.";
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
}

function handleLoadMore() {
  const category = route.query.category;

  offset.value++;
  getProducts({
    limit: 12,
    skip: 12 * offset.value,
    category,
  });
}

function handleFetchSortedProducts(value) {
  sortBy.value = value;
  const category = route.query.category;
  getProducts({ limit: 0, skip: 0, category });
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/products";
</style>

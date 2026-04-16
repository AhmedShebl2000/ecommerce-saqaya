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
          getProducts({ limit: 12, skip: 0, category: $route.query.category })
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

<script>
import ProductItem from "@/modules/products/components/ProductItem.vue";
import SortDropdown from "../components/SortDropdown.vue";
import { useProductsStore } from "../store/products";
export default {
  components: { ProductItem, SortDropdown },
  data() {
    return {
      offset: 0,
      sortBy: "",
      loading: false,
      loadingMore: false,
      error: null,
    };
  },

  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const category = this.$route.query.category;
    this.getProducts({ limit: 12, skip: 0, category });
  },
  mounted() {
    console.log(this.products);
  },
  watch: {
    "$route.query.category"(newCategory) {
      this.offset = 0;
      this.sortBy = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.getProducts({ limit: 12, skip: 0, category: newCategory });
    },
  },
  computed: {
    productsStore() {
      return useProductsStore();
    },
    products() {
      const products = this.productsStore.products;

      let filteredProducts;
      switch (this.sortBy) {
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
              (a, b) =>
                (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
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
    },
    totalProducts() {
      return this.productsStore.totalProducts;
    },
    disabled() {
      if (!this.totalProducts) return false;
      return this.products.length >= this.totalProducts;
    },
    breadcrumbItems() {
      return [
        { id: 1, label: "Home", to: "/" },
        {
          id: 2,
          label: "Products",
        },
      ];
    },
  },
  methods: {
    async getProducts({ limit, skip, category }) {
      if (skip === 0) {
        this.loading = true;
        this.error = null;
      } else {
        this.loadingMore = true;
      }
      try {
        await this.productsStore.fetchProducts({ limit, skip, category });
      } catch (error) {
        this.error = "Failed to load products. Please try again.";
      } finally {
        this.loading = false;
        this.loadingMore = false;
      }
    },
    handleLoadMore() {
      const category = this.$route.query.category;

      this.offset++;
      this.getProducts({
        limit: 12,
        skip: 12 * this.offset,
        category,
      });
    },
    handleFetchSortedProducts(value) {
      this.sortBy = value;
      const category = this.$route.query.category;
      this.getProducts({ limit: 0, skip: 0, category });
    },
  },
};
</script>

<style scoped>
.products-page__button-container {
  text-align: center;
  padding-top: 60px;
  margin-bottom: 30px;
}

.products-page__grid {
  display: grid;
  grid-template-columns: repeat(4, 270px);
  align-content: center;
  justify-content: space-between;
  row-gap: 60px;
  margin-top: 30px;
}

.products-page__item {
  list-style: none;
  scroll-snap-align: start;
  height: auto;
  min-width: 0;
}

.products-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.products-page__title {
  font-weight: bold;
  font-size: 36px;
  line-height: 1.2;
}

.products-page__filter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.products-page__filter-label {
  margin: 0;
}

.products-page__filter-select {
  background-color: #423840;
  color: #fafafa;
  border: 1px solid #423840;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  max-width: 100%;
}

.products-page__loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.products-page__load-more {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

/* MEDIA QUERIES */
@media (max-width: 1200px) {
  .products-page__title {
    margin-left: 50px;
  }
  .products-page__filter {
    margin-right: 55px;
  }

  .products-page__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    place-items: center;
  }
}

@media (max-width: 992px) {
  .products-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 20px;
  }

  .products-page__title {
    font-size: 30px;
  }
}

@media (max-width: 768px) {
  .products-page__title {
    margin-left: 30px;
    font-size: 24px;
  }
  .products-page__header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .products-page__filter {
    width: 100%;
  }

  .products-page__filter-select {
    width: 100%;
    max-width: 160px;
  }

  .products-page__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .products-page__button-container {
    padding-top: 24px;
  }
}

@media (max-width: 480px) {
  .products-page__title {
    font-size: 22px;
  }

  .products-page__filter {
    flex-direction: column;
    align-items: stretch;
  }

  .products-page__filter-select {
    max-width: 100%;
  }
}
</style>

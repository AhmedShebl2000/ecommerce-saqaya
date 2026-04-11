<template>
  <section id="explore-out-products">
    <div class="explore-header">
      <h2 class="explore-header-font">Explore our products</h2>
      <div class="filter">
        <p>Sort by</p>
        <select v-model="sortBy" @change="handleFetchSortedProducts">
          <option value="Highest Rating">Highest Rating</option>
          <option value="Low to high">Price: Low to high</option>
          <option value="High to low">Price: High to low</option>
          <option value="discount">Discount percentage</option>
          <option value="brand">Brand</option>
          <option value="category">Category</option>
        </select>
      </div>
    </div>
    <ul class="explore-grid">
      <li v-for="product in products" :key="product.id">
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
    <div class="btn-container">
      <base-button v-if="!disabled" :link="false" @click="handleLoadMore">
        Load more...
      </base-button>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/modules/products/components/ProductItem.vue";
export default {
  components: { ProductItem },
  data() {
    return {
      offset: 0,
      sortBy: "",
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
    products() {
      const products = this.$store.getters["products/products"];

      console.log(products);

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
      return this.$store.getters["products/totalProducts"];
    },
    disabled() {
      if (!this.totalProducts) return false;
      return this.products.length >= this.totalProducts;
    },
  },
  methods: {
    getProducts({ limit, skip, category }) {
      this.$store.dispatch("products/fetchProducts", { limit, skip, category });
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
    handleFetchSortedProducts() {
      const category = this.$route.query.category;
      this.getProducts({ limit: 0, skip: 0, category });
    },
  },
};
</script>

<style scoped>
.btn-container {
  text-align: center;
  padding-top: 60px;
  margin-bottom: 30px;
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(4, 270px);
  align-content: center;
  justify-content: space-between;
  row-gap: 60px;
  margin-top: 30px;
}

li {
  list-style: none;
  scroll-snap-align: start;
  height: 322px;
  min-width: 270px;
}

.explore-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.explore-header-font {
  font-weight: bold;
  font-size: 36px;
}

.arrows {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.filter select {
  background-color: #423840;
  color: #fafafa;
  border: 1px solid #423840;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
}
</style>

<template>
  <section id="explore-out-products">
    <div class="explore-header">
      <h2 class="explore-header-font">Explore our products</h2>
      <div class="filter">
        <!-- FILTER -->
        <p>Sort by</p>
        <select>
          <option>Highest Rating</option>
          <option>Price: Low to high</option>
          <option>Price: High to low</option>
          <option>Discount percentage</option>
          <option>Brand</option>
          <option>Category</option>
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
    };
  },
  created() {
    this.getProducts({ limit: 12, skip: 0 });
  },
  computed: {
    products() {
      return this.$store.getters["products/products"];
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
    getProducts({ limit, skip }) {
      this.$store.dispatch("products/fetchProducts", { limit, skip });
    },
    handleLoadMore() {
      console.log(this.offset);
      console.log("products length:", this.products.length);
      console.log("total products:", this.totalProducts);
      this.getProducts({
        limit: 12,
        skip: 12 * this.offset + 12,
      });
      this.offset++;
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

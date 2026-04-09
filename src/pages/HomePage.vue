<template>
  <div>
    <section id="flash-sales">
      <div class="explore-header">
        <h2 class="explore-header-font">Flash Sales</h2>
        <div class="arrows">
          <base-arrow type="left" @click="scrollLeft"></base-arrow>
          <base-arrow type="right" @click="scrollRight"></base-arrow>
        </div>
      </div>

      <ul class="flash-sale-items" ref="slider">
        <li v-for="product in flashSaleProducts" :key="product.id">
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
        <base-button :link="true" to="/products">
          View All Products
        </base-button>
      </div>
    </section>

    <section id="explore-out-products">
      <div class="explore-header">
        <h2 class="explore-header-font">Explore our products</h2>
        <div class="arrows">
          <base-arrow type="left"></base-arrow>
          <base-arrow type="right"></base-arrow>
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
        <base-button :link="true" to="/products">
          View All Products
        </base-button>
      </div>
    </section>
  </div>
</template>

<script>
import ProductItem from "@/components/Products/ProductItem.vue";

export default {
  components: { ProductItem },
  created() {
    this.getProducts({ limit: 8, skip: 0 });
    this.getFlashSaleProducts();
  },
  computed: {
    products() {
      return this.$store.getters["products/products"];
    },
    flashSaleProducts() {
      return this.$store.getters["products/flashSaleProducts"];
    },
  },
  methods: {
    getProducts({ limit, skip }) {
      this.$store.dispatch("products/fetchProducts", { limit, skip });
    },
    getFlashSaleProducts() {
      this.$store.dispatch("products/fetchFlashSaleProducts");
    },
    scrollLeft() {
      this.$refs.slider.scrollBy({
        left: -390,
        behavior: "smooth",
      });
    },
    scrollRight() {
      console.log(this.$refs.slider.scrollWidth);
      console.log(this.$refs.slider.scrollLeft + this.$refs.slider.clientWidth);
      this.$refs.slider.scrollBy({
        left: 390,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.flash-sale-items {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 120px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  margin-top: 30px;
  margin-bottom: 30px;
}

.flash-sale-items::-webkit-scrollbar {
  display: none;
}
.flash-sale-items {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.btn-container {
  text-align: center;
  padding-top: 30px;
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
</style>

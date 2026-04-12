<template>
  <div>
    <hero-component></hero-component>

    <section id="flash-sales">
      <base-header>Today's</base-header>
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
            :discountPercentage="product.discountPercentage"
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

    <div class="home__divider"></div>

    <section id="categories">
      <base-header>Categories</base-header>
      <h2 class="categories__browse-header">Browse By Category</h2>
      <div class="categories__items-container">
        <base-category-card
          v-for="card in cards"
          :key="card.id"
          :title="card.title"
          :image="card.image"
          :category="card.category"
        ></base-category-card>
      </div>
    </section>

    <div class="home__divider"></div>

    <section id="explore-out-products">
      <base-header>Our Products</base-header>
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
    <section class="home__service-features">
      <base-service-features :features="features"></base-service-features>
    </section>
  </div>
</template>

<script>
import ProductItem from "@/modules/products/components/ProductItem.vue";
import BaseCategoryCard from "../components/BaseCategoryCard.vue";
import HeroComponent from "../components/HeroComponent.vue";
import BaseIconDelivery from "@/modules/shared/components/icons/BaseIconDelivery.vue";
import BaseIconSupport from "@/modules/shared/components/icons/BaseIconSupport.vue";
import BaseIconGuarantee from "@/modules/shared/components/icons/BaseIconGuarantee.vue";

export default {
  components: { ProductItem, BaseCategoryCard, HeroComponent },
  data() {
    return {
      cards: [
        {
          id: 1,
          image: `<svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M29.5455 28.125V32.2917C29.5455 32.8667 30.0545 33.3333 30.6818 33.3333C31.3091 33.3333 31.8182 32.8667 31.8182 32.2917V28.125C31.8182 27.55 31.3091 27.0833 30.6818 27.0833C30.0545 27.0833 29.5455 27.55 29.5455 28.125ZM39.7727 8.33333H32.9545C32.3273 8.33333 31.8182 8.8 31.8182 9.375C31.8182 9.95 32.3273 10.4167 32.9545 10.4167H39.7727C40.4 10.4167 40.9091 9.95 40.9091 9.375C40.9091 8.8 40.4 8.33333 39.7727 8.33333ZM43.5227 2.8875C39.9818 1.025 35.4205 0 30.6818 0C26.2068 0 21.85 0.920833 18.4136 2.59583C16.3023 3.62292 13.925 4.16667 11.5341 4.16667H3.40909C1.52955 4.16667 0 5.56875 0 7.29167V15.625C0 17.3479 1.52955 18.75 3.40909 18.75H11.5341C13.9227 18.75 16.3023 19.2937 18.4114 20.3208C20.3091 21.2458 22.5023 21.9146 24.8273 22.3521C25.8273 30.0229 26.175 38.8062 25.1068 39.8875C24.7818 40.1854 24.6841 40.6333 24.8614 41.0229C25.0364 41.4125 25.4523 41.6667 25.9114 41.6667H29.2932C29.1295 44.8542 27.9818 47.9146 21.3659 47.9146C16.7705 47.9146 13.2727 46.7687 12.0068 44.85C11.1636 43.5708 11.2841 41.9625 12.3705 40.0667L12.8773 39.2104C14.5523 36.4229 17.6682 31.2375 15.1568 27.3417C13.2364 24.3625 8.65227 22.9146 1.13636 22.9146C0.509091 22.9146 0 23.3812 0 23.9562C0 24.5312 0.509091 24.9979 1.13636 24.9979C7.68636 24.9979 11.7432 26.1417 13.2 28.4C15.0523 31.2729 12.3432 35.7812 10.8864 38.2042L10.3568 39.0979C8.51364 42.3187 9.17727 44.5896 10.0614 45.9292C11.7932 48.5542 15.8068 50 21.3659 50C30.4159 50 31.4568 44.6729 31.575 41.6667H32.7295C32.9864 41.6667 33.2364 41.5875 33.4364 41.4417C35.9023 39.6521 36.1295 32.4354 36.1386 22.4062C38.8409 21.9333 41.3818 21.1562 43.5227 20.0292C47.6386 17.8667 50 14.7417 50 11.4583C50 8.175 47.6409 5.05208 43.5227 2.8875ZM13.6364 16.7896C12.9386 16.7104 12.2386 16.6667 11.5341 16.6667H3.40909C2.78182 16.6667 2.27273 16.2 2.27273 15.625V7.29167C2.27273 6.71667 2.78182 6.25 3.40909 6.25H11.5364C12.2386 6.25 12.9409 6.20625 13.6364 6.12708V16.7896ZM32.2523 39.5833H30.4682C30.4636 39.5833 30.4614 39.5812 30.4568 39.5812C30.4523 39.5812 30.45 39.5833 30.4455 39.5833H27.5909C28.5841 35.6875 27.75 27.3479 27.1636 22.7167C28.3205 22.8417 29.4955 22.9167 30.6818 22.9167C31.7568 22.9167 32.8182 22.8479 33.8659 22.7458C33.8614 28.4208 33.7864 37.65 32.2523 39.5833ZM42.3955 18.2229C39.1909 19.9062 35.0341 20.8333 30.6841 20.8333C26.5727 20.8333 22.5955 19.9979 19.4795 18.4813C18.3477 17.9292 17.1455 17.5125 15.9091 17.2104V5.70833C17.1455 5.40417 18.3477 4.9875 19.4818 4.43542C22.5955 2.91875 26.5727 2.08333 30.6841 2.08333C35.0341 2.08333 39.1909 3.01042 42.3955 4.69375C45.7864 6.47708 47.7295 8.94167 47.7295 11.4583C47.7295 13.975 45.7864 16.4396 42.3955 18.2229ZM39.7727 12.5H32.9545C32.3273 12.5 31.8182 12.9667 31.8182 13.5417C31.8182 14.1167 32.3273 14.5833 32.9545 14.5833H39.7727C40.4 14.5833 40.9091 14.1167 40.9091 13.5417C40.9091 12.9667 40.4 12.5 39.7727 12.5Z" fill="currentColor"/>
</svg>`,
          title: "Beauty",
          category: "beauty",
        },
        {
          id: 2,
          image: `<svg width="50" height="30" viewBox="0 0 50 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.50833 11.8775C9.18542 15.345 12.2937 17.5 15.625 17.5C16.2 17.5 16.6688 16.94 16.6688 16.25C16.6688 15.56 16.2021 15 15.6271 15C13.0375 15 10.6167 13.3225 9.3125 10.6225C9.02292 10.025 8.3875 9.82 7.8875 10.1675C7.38958 10.515 7.21875 11.28 7.50833 11.8775ZM47.9167 0H2.08333C0.935417 0 0 1.1225 0 2.5V5C0 6.3775 0.935417 7.5 2.08333 7.5H2.13542C2.48333 12.935 5.06458 17.6225 8.78333 20.25C8.51875 20.475 8.33333 20.83 8.33333 21.25C8.33333 21.94 8.8 22.5 9.375 22.5H11.0271L6.55417 27.8675C6.14792 28.355 6.14792 29.1475 6.55417 29.635C6.75833 29.8775 7.025 30 7.29167 30C7.55833 30 7.825 29.8775 8.02708 29.635L13.9729 22.5H36.025L41.9708 29.635C42.175 29.8775 42.4417 30 42.7083 30C42.975 30 43.2417 29.8775 43.4437 29.635C43.85 29.1475 43.85 28.355 43.4437 27.8675L38.9708 22.5H40.625C41.2 22.5 41.6667 21.94 41.6667 21.25C41.6667 20.83 41.4813 20.475 41.2167 20.25C44.9354 17.6225 47.5167 12.9375 47.8646 7.5H47.9167C49.0646 7.5 50 6.3775 50 5V2.5C50 1.1225 49.0646 0 47.9167 0ZM34.375 20H15.625C9.65625 20 4.73958 14.4975 4.2125 7.5H45.7875C45.2583 14.4975 40.3417 20 34.375 20ZM47.9167 5H2.08333V2.5H47.9167V5Z" fill="currentColor"/>
</svg>
`,
          title: "Furniture",
          category: "furniture",
        },
        {
          id: 3,
          image: `<svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.619 8.33333C23.2762 8.33333 23.8095 7.86667 23.8095 7.29167V6.25H26.4167C27.4619 8.68542 32.1286 10.4167 38.0952 10.4167C44.8833 10.4167 50 8.17708 50 5.20833C50 2.23958 44.8833 0 38.0952 0C32.1286 0 27.4595 1.73125 26.4167 4.16667H23.8095V1.04167C23.8095 0.466667 23.2762 0 22.619 0H17.8571C17.2 0 16.6667 0.466667 16.6667 1.04167V7.29167C16.6667 7.86667 17.2 8.33333 17.8571 8.33333H19.0476V10.4167H17.8571C15.8881 10.4167 14.2857 11.8187 14.2857 13.5417V15.3667C6.02143 17.5958 0 24.3396 0 32.2917C0 42.0562 9.07857 50 20.2381 50C31.3976 50 40.4762 42.0562 40.4762 32.2917C40.4762 24.3396 34.4548 17.5958 26.1905 15.3667V13.5417C26.1905 11.8187 24.5881 10.4167 22.619 10.4167H21.4286V8.33333H22.619ZM38.0952 2.08333C43.9095 2.08333 47.619 3.93333 47.619 5.20833C47.619 6.48333 43.9095 8.33333 38.0952 8.33333C32.281 8.33333 28.5714 6.48333 28.5714 5.20833C28.5714 3.93333 32.281 2.08333 38.0952 2.08333ZM38.0952 32.2917C38.0952 40.9083 30.0857 47.9167 20.2381 47.9167C10.3905 47.9167 2.38095 40.9083 2.38095 32.2917C2.38095 23.675 10.3905 16.6667 20.2381 16.6667C30.0857 16.6667 38.0952 23.675 38.0952 32.2917ZM22.619 12.5C23.2762 12.5 23.8095 12.9667 23.8095 13.5417V14.8771C22.6476 14.6937 21.4595 14.5833 20.2381 14.5833C19.0167 14.5833 17.8286 14.6937 16.6667 14.8771V13.5417C16.6667 12.9667 17.2 12.5 17.8571 12.5H22.619ZM19.0476 6.25V2.08333H21.4286V6.25H19.0476ZM7.14286 32.2917C7.14286 31.7167 6.60952 31.25 5.95238 31.25C5.29524 31.25 4.7619 31.7167 4.7619 32.2917C4.7619 39.7583 11.7048 45.8333 20.2381 45.8333C20.8952 45.8333 21.4286 45.3667 21.4286 44.7917C21.4286 44.2167 20.8952 43.75 20.2381 43.75C13.0167 43.75 7.14286 38.6104 7.14286 32.2917Z" fill="currentColor"/>
</svg>
`,
          title: "Fragrance",
          category: "fragrances",
        },
        {
          id: 4,
          image: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16" stroke="black" stroke-width="0.01" stroke-linecap="round" stroke-linejoin="round"">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg>
`,
          title: "Camera",
          category: "smartphones",
        },
        {
          id: 5,
          image: `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2229_551)">
    <path d="M16.3334 30.3333H14C11.4227 30.3333 9.33337 32.4226 9.33337 34.9999V41.9999C9.33337 44.5772 11.4227 46.6666 14 46.6666H16.3334C18.9107 46.6666 21 44.5772 21 41.9999V34.9999C21 32.4226 18.9107 30.3333 16.3334 30.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 30.3333H39.6667C37.0893 30.3333 35 32.4226 35 34.9999V41.9999C35 44.5772 37.0893 46.6666 39.6667 46.6666H42C44.5773 46.6666 46.6667 44.5772 46.6667 41.9999V34.9999C46.6667 32.4226 44.5773 30.3333 42 30.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.33337 34.9999V27.9999C9.33337 23.0492 11.3 18.3013 14.8007 14.8006C18.3014 11.2999 23.0493 9.33325 28 9.33325C32.9507 9.33325 37.6987 11.2999 41.1994 14.8006C44.7 18.3013 46.6667 23.0492 46.6667 27.9999V34.9999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2229_551">
      <rect width="56" height="56" fill="white"/>
    </clipPath>
  </defs>
</svg>`,
          title: "Mobile Accessories",
          category: "mobile-accessories",
        },
        {
          id: 6,
          image: `
        <svg width="30" height="60" viewBox="0 0 30 60" fill="currentColor" xmlns='http://www.w3.org/2000/svg'>
<path d="M25.9091 24.9999H16.3636V22.3349C18.5536 21.8599 20.5609 20.3049 21.5073 18.2099C22.56 15.8799 22.02 13.4149 20.0564 11.6149C15.7664 7.6824 16.3527 1.42989 16.3582 1.36739C16.4264 0.692387 15.8973 0.0898856 15.1636 0.00988544C14.4491 -0.0751147 13.7618 0.397386 13.6527 1.06739C13.6418 1.12989 12.6273 7.3024 9.73091 11.8724C7.98545 14.6274 7.76182 17.4474 9.12 19.6099C10.0609 21.1074 11.6782 22.0474 13.6364 22.3574V24.9999H4.09091C1.83545 24.9999 0 26.6824 0 28.7499V28.7749C0 28.7849 0 28.7924 0 28.8024V56.25C0 58.3175 1.83545 60 4.09091 60H25.9091C28.1645 60 30 58.3175 30 56.25V28.7499C30 26.6824 28.1645 24.9999 25.9091 24.9999ZM11.4818 18.3624C10.6364 17.0174 10.8627 15.0599 12.0873 13.1274C13.1345 11.4749 13.95 9.6674 14.5745 7.9749C15.2373 9.8099 16.3309 11.7374 18.1282 13.3849C19.7318 14.8574 19.3555 16.4424 18.9873 17.2549C18.2809 18.8199 16.5655 19.9999 15 19.9999C13.3936 19.9999 12.1445 19.4174 11.4818 18.3624ZM27.2727 56.25C27.2727 56.94 26.6618 57.5 25.9091 57.5H4.09091C3.33818 57.5 2.72727 56.94 2.72727 56.25V31.5499C2.90455 31.8024 3.07636 32.0649 3.24545 32.3249C4.05818 33.5799 4.97727 35 6.81818 35C8.63455 35 9.61364 33.8825 10.2655 33.1399C10.35 33.0424 10.4618 32.9149 10.5709 32.7999C10.7645 33.3224 10.9691 34.0949 11.1218 34.6674C11.7845 37.1675 12.54 40 15 40C17.2145 40 18.1609 37.645 19.0773 35.365C19.4727 34.375 20.1382 32.7174 20.4545 32.4999C21.4745 32.4999 22.6309 33.2949 23.5609 33.935C24.4255 34.53 25.1073 35 25.9091 35C26.4436 35 26.88 34.7875 27.2727 34.4874V56.25ZM27.2727 30.5874C26.9455 30.8849 26.6482 31.2549 26.3509 31.6449C26.1982 31.8424 25.98 32.1274 25.7945 32.3349C25.6064 32.2149 25.3855 32.0624 25.2 31.9349C24.0136 31.1199 22.3882 29.9999 20.4573 29.9999C18.3273 29.9999 17.4082 32.2874 16.5191 34.5024C16.1264 35.475 15.4009 37.285 15.1227 37.5275C14.6073 37.22 14.0427 35.095 13.77 34.075C13.1891 31.8874 12.6873 29.9999 10.9091 29.9999C9.52091 29.9999 8.72182 30.9099 8.13545 31.5724C7.55727 32.2324 7.27636 32.4999 6.81545 32.4999C6.52909 32.4999 5.96455 31.6274 5.59091 31.0499C4.95818 30.0699 4.17818 28.9174 2.93182 28.1324C3.16909 27.7599 3.58909 27.4999 4.09091 27.4999H25.9091C26.6618 27.4999 27.2727 28.0599 27.2727 28.7499V30.5874Z" fill="currentColor"/>
</svg>`,
          title: "Home Accessories",
          category: "home-decoration",
        },
      ],
      features: [
        {
          id: 1,
          icon: BaseIconDelivery,
          title: "FREE AND FAST DELIVERY",
          subtitle: "Free delivery for all orders over $140",
        },
        {
          id: 2,
          icon: BaseIconSupport,
          title: "24/7 CUSTOMER SERVICE",
          subtitle: "Friendly 24/7 customer support",
        },
        {
          id: 3,
          icon: BaseIconGuarantee,
          title: "MONEY BACK GUARANTEE",
          subtitle: "We return money within 30 days",
        },
      ],
    };
  },
  created() {
    this.getHomeProducts();
    this.getFlashSaleProducts();
  },
  computed: {
    products() {
      return this.$store.getters["products/homeProducts"];
    },
    flashSaleProducts() {
      return this.$store.getters["products/flashSaleProducts"];
    },
  },
  methods: {
    getProducts({ limit, skip }) {
      this.$store.dispatch("products/fetchProducts", { limit, skip });
    },
    getHomeProducts() {
      this.$store.dispatch("products/fetchHomeProducts");
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
  overflow-y: visible;
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
  height: auto;
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

.categories__browse-header {
  font-weight: bold;
  font-size: 36px;
}

.categories__items-container {
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 25px;
}

.home__divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.411);
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
}

.home__service-features {
  margin: 80px 0;
}
</style>

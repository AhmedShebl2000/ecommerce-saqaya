<template>
  <div class="card" data-test="product-card" @click="emit('click')">
    <div
      v-if="discount > 0"
      class="card__discount"
      data-test="product-discount"
    >
      -{{ discount }}%
    </div>
    <div class="card__wishlist">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17" cy="17" r="17" fill="white" />
        <path
          d="M13 10C10.7912 10 9 11.7396 9 13.8859C9 15.6185 9.7 19.7305 16.5904 23.8873C16.7138 23.961 16.8555 24 17 24C17.1445 24 17.2862 23.961 17.4096 23.8873C24.3 19.7305 25 15.6185 25 13.8859C25 11.7396 23.2088 10 21 10C18.7912 10 17 12.3551 17 12.3551C17 12.3551 15.2088 10 13 10Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="card__see">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="17" cy="17" r="17" fill="white" />
        <path
          d="M26.257 15.962C26.731 16.582 26.731 17.419 26.257 18.038C24.764 19.987 21.182 24 17 24C12.818 24 9.23601 19.987 7.74301 18.038C7.51239 17.7411 7.38721 17.3759 7.38721 17C7.38721 16.6241 7.51239 16.2589 7.74301 15.962C9.23601 14.013 12.818 10 17 10C21.182 10 24.764 14.013 26.257 15.962V15.962Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17C14 18.6569 15.3431 20 17 20Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="card__image">
      <img :src="image" alt="product image" />
      <div class="card__add-to-cart" @click.stop="handleAddToCart">
        Add To Cart
      </div>
    </div>
    <p class="card__text" data-test="product-title">{{ title }}</p>
    <div class="card__price-rating">
      <span class="card__price" data-test="product-price">${{ price }}</span>
      <span v-if="discountPercentage" class="card__previous-price"
        >${{ previousPrice }}</span
      >
    </div>
    <base-rating-component
      :rating="rating"
      :ratingCount="ratingCount"
    ></base-rating-component>
  </div>
</template>

<script setup>
import { removeDecimals } from "@/mixins/removeDecimals";
import { round } from "@/mixins/round";
import BaseRatingComponent from "./BaseRatingComponent.vue";
import { useCartStore } from "@/modules/cart/store/cart";
import { useToast } from "vue-toastification";
import { computed } from "vue";

const toast = useToast();
const cartStore = useCartStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: false,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
  },
  ratingCount: {
    type: Number,
    required: false,
    default: 0,
  },
});
const emit = defineEmits(["click"]);

const discount = computed(() => {
  return removeDecimals(props.discountPercentage);
});

const previousPrice = computed(() => {
  return round(props.price + props.price * (props.discountPercentage / 100));
});

function handleAddToCart() {
  const { id, image, title, price } = props;

  const product = {
    id,
    thumbnail: image,
    title,
    price,
  };
  cartStore.addToCart(product);

  toast.success(`${props.title} has been added to cart`, {
    position: "top-left",
  });
}

// export default {
//   components: { BaseRatingComponent },
//   props: {
//     id: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     discountPercentage: {
//       type: Number,
//       required: false,
//       default: 0,
//     },
//     rating: {
//       type: Number,
//       required: true,
//     },
//     ratingCount: {
//       type: Number,
//       required: false,
//       default: 0,
//     },
//   },
//   computed: {
//     cartStore() {
//       return useCartStore();
//     },
//     toast() {
//       return useToast();
//     },
//     discount() {
//       return removeDecimals(this.discountPercentage);
//     },
//     previousPrice() {
//       return round(this.price + this.price * (this.discountPercentage / 100));
//     },
//   },
//   methods: {
//     handleAddToCart() {
//       const product = {
//         id: this.id,
//         thumbnail: this.image,
//         title: this.title,
//         price: this.price,
//       };
//       this.cartStore.addToCart(product);

//       this.toast.success(`${this.title} has been added to cart`, {
//         position: "top-left",
//       });
//     },
//   },
// };
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/cards";
</style>

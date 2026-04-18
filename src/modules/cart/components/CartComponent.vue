<template>
  <div class="header__cart" data-test="cart-component">
    <div class="header__cart-icon" data-test="cart-icon" @click="toggleCart">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.25 3.75H5.25L7.5 16.5H19.5"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div v-if="cartQuantity" class="header__cart-badge">
        <p class="header__cart-count">{{ cartQuantity }}</p>
      </div>
    </div>

    <div
      v-if="isCartOpen"
      data-test="cart-overlay"
      class="header__cart-overlay"
      @click="closeCart"
    ></div>

    <div
      :class="[
        'header__cart--open',
        { 'header__cart-panel--visible': isCartOpen },
      ]"
      @click.stop
    >
      <div class="header__cart-container">
        <h3 class="header__cart-review" data-test="cart-title">
          Shopping Cart
        </h3>
        <div
          class="header__cart-close"
          data-test="cart-close"
          @click="closeCart"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_812_3152)">
              <path
                d="M8 16L12 12M16 8L11.9992 12M11.9992 12L8 8M12 12L16 16"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="11.25"
                stroke="black"
                stroke-width="1.5"
              />
            </g>
            <defs>
              <clipPath id="clip0_812_3152">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="header__cart-items-grid">
        <div
          v-if="cartQuantity === 0"
          data-test="cart-empty"
          class="header__cart--empty"
        >
          <p>You currently have no items in cart</p>
        </div>
        <div class="header__cart-items" data-test="cart-items">
          <cart-item
            v-for="cartItem in cartItems"
            :key="cartItem.product.id"
            :id="cartItem.product.id"
            :title="cartItem.product.title"
            :thumbnail="cartItem.product.thumbnail"
            :price="cartItem.product.price"
          ></cart-item>
        </div>
        <cart-payment v-if="cartQuantity !== 0"></cart-payment>
      </div>
      <div
        v-if="cartQuantity !== 0"
        class="header__cart-items-buttons"
        data-test="cart-actions"
      >
        <base-button>Place Order</base-button>
        <div data-test="clear-cart">
          <base-button type="outline" @click="clearCart"
            >Clear Cart</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useCartStore } from "../store/cart";
import CartItem from "./CartItem.vue";
import CartPayment from "./CartPayment.vue";

const cartStore = useCartStore();

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEscape);
});

const cartQuantity = computed(() => {
  return cartStore.cartQuantity;
});

const cartItems = computed(() => {
  return cartStore.cartItems;
});

const isCartOpen = computed(() => {
  return cartStore.isCartOpen;
});

function toggleCart() {
  cartStore.toggleCart();
}
function closeCart() {
  cartStore.closeCart();
}
function clearCart() {
  cartStore.clearCart();
}
function handleEscape(event) {
  if (event.key === "Escape" && isCartOpen.value === true) {
    closeCart();
  }
}

// export default {
//   components: { CartItem, CartPayment },
//   data() {
//     return {};
//   },
//   mounted() {
//     window.addEventListener("keydown", this.handleEscape);
//   },

//   beforeUnmount() {
//     window.removeEventListener("keydown", this.handleEscape);
//   },
//   computed: {
//     cartStore() {
//       return useCartStore();
//     },
//     cartQuantity() {
//       return this.cartStore.cartQuantity;
//     },
//     cartItems() {
//       return this.cartStore.cartItems;
//     },
//     isCartOpen() {
//       return this.cartStore.isCartOpen;
//     },
//   },
//   methods: {
//     toggleCart() {
//       this.cartStore.toggleCart();
//     },
//     closeCart() {
//       this.cartStore.closeCart();
//     },
//     clearCart() {
//       this.cartStore.clearCart();
//     },
//     handleEscape(event) {
//       if (event.key === "Escape" && this.isCartOpen === true) {
//         this.closeCart();
//       }
//     },
//   },
// };
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/header-widget";
</style>

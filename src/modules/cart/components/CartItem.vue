<template>
  <div>
    <div class="header__cart-item" data-test="cart-item">
      <div
        class="header__cart-item-remove"
        data-test="cart-item-remove"
        @click="removeItemFromCart"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" fill="#DB4444" />
          <path
            d="M9 15L12 12M15 9L11.9994 12M11.9994 12L9 9M12 12L15 15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="header__cart-item-image">
        <img :src="thumbnail" />
      </div>
      <p data-test="cart-item-title">{{ title }}</p>
      <div class="header__cart-item-qty">
        <div
          class="header__cart-item-increase"
          data-test="cart-item-increase"
          @click="increaseCartItemQty"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.75732 7.36663L4.45732 10.6666L3.51465 9.72396L7.75732 5.48129L12 9.72396L11.0573 10.6666L7.75732 7.36663Z"
              fill="black"
            />
          </svg>
        </div>
        <input
          data-test="cart-item-qty"
          class="header__cart-item-qty-input"
          type="number"
          min="1"
          :value="itemQty"
        />
        <div
          class="header__cart-item-decrease"
          data-test="cart-item-decrease"
          @click="decreaseCartItemQty"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.24268 8.63337L11.5427 5.33337L12.4854 6.27604L8.24268 10.5187L4.00002 6.27604L4.94268 5.33337L8.24268 8.63337Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <p class="header__cart-item-price" data-test="cart-item-price">
        ${{ roundedPrice }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { round } from "@/composables/round";
import { useCartStore } from "../store/cart";
import { computed } from "vue";

const cartStore = useCartStore();

const props = defineProps(["id", "title", "thumbnail", "price"]);

const cartItems = computed(() => {
  return cartStore.cartItems;
});

const itemQty = computed(() => {
  const item = cartItems.value.find((item) => item.product.id === props.id);
  return item ? item.qty : 1;
});

const roundedPrice = computed(() => {
  return round(props.price * itemQty.value);
});

function increaseCartItemQty() {
  const item = cartItems.value.find((item) => item.product.id === props.id);
  if (!item) return;
  cartStore.addToCart(item.product);
}
function decreaseCartItemQty() {
  cartStore.decreaseQuantity(props.id);
}
function removeItemFromCart() {
  cartStore.removeFromCart(props.id);
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/cart-item";
</style>

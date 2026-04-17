<template>
  <div class="header__cart-total-details" data-test="cart-payment">
    <div class="header__cart-total-fields" data-test="cart-subtotal-row">
      <p>Subtotal:</p>
      <span data-test="cart-subtotal">${{ cartTotal }}</span>
    </div>

    <div class="header__cart-divider"></div>
    <div class="header__cart-total-fields" data-test="cart-shipping-row">
      <p>Shipping:</p>
      <span data-test="cart-shipping">Free</span>
    </div>
    <div class="header__cart-divider"></div>
    <div class="header__cart-total-fields" data-test="cart-total-row">
      <p>Total:</p>
      <span data-test="cart-total">${{ cartTotal }}</span>
    </div>
  </div>
</template>

<script>
import { round } from "@/mixins/round";
import { useCartStore } from "../store/cart";

export default {
  computed: {
    cartStore() {
      return useCartStore();
    },
    cartTotal() {
      const total = this.cartStore.cartTotal;
      return round(total);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/cart-payment";
</style>

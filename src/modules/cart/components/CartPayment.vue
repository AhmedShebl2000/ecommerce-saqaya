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
      const total = this.cartStore.cart.items.reduce(
        (sum, item) => sum + item.product.price * item.qty,
        0
      );
      return round(total);
    },
  },
};
</script>

<style scoped>
.header__cart-total-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.header__cart-total-fields {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__cart-divider {
  height: 1px;
  background-color: black;
  width: 100%;
}
</style>

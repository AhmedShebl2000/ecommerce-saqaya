<template>
  <div class="header__cart-total-details">
    <div class="header__cart-total-fields">
      <p>Subtotal:</p>
      <span>${{ cartTotal }}</span>
    </div>

    <div class="header__cart-divider"></div>
    <div class="header__cart-total-fields">
      <p>Shipping:</p>
      <span>Free</span>
    </div>
    <div class="header__cart-divider"></div>
    <div class="header__cart-total-fields">
      <p>Total:</p>
      <span>${{ cartTotal }}</span>
    </div>
  </div>
</template>

<script>
import { round } from "@/mixins/round";

export default {
  computed: {
    cartTotal() {
      const total = this.$store.getters["cart/cartTotal"];
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

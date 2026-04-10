<template>
  <div>
    <div class="header__cart-item">
      <div class="header__cart-item-remove" @click="removeItemFromCart">
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
      <p>{{ title }}</p>
      <div class="header__cart-item-qty">
        <div class="header__cart-item-increase" @click="increaseCartItemQty">
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
          class="header__cart-item-qty-input"
          type="number"
          min="1"
          v-model="itemQty"
        />
        <div class="header__cart-item-decrease" @click="decreaseCartItemQty">
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
      <p class="header__cart-item-price">${{ roundedPrice }}</p>
    </div>
  </div>
</template>

<script>
import { round } from "@/mixins/round";

export default {
  props: ["id", "title", "thumbnail", "price"],
  computed: {
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },
    itemQty() {
      const item = this.cartItems.find((item) => item.product.id === this.id);
      return item ? item.qty : 1;
    },
    roundedPrice() {
      return round(this.price * this.itemQty);
    },
  },
  methods: {
    increaseCartItemQty() {
      console.log(this.id);
      const item = this.cartItems.find((item) => item.product.id === this.id);
      console.log(item);
      this.$store.commit("cart/ADD_TO_CART", item.product);
    },
    decreaseCartItemQty() {
      this.$store.commit("cart/DECREASE_QUANTITY", this.id);
    },
    removeItemFromCart() {
      this.$store.commit("cart/REMOVE_FROM_CART", this.id);
    },
  },
};
</script>

<style scoped>
.header__cart-item {
  position: relative;
  display: grid;
  grid-template-columns: 57px 140px 72px 51px;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: #fff;
}

.header__cart-item:hover {
  background: #a0bce0;
}

.header__cart-item-remove {
  position: absolute;
  top: 10px;
  left: 10px;
}

.header__cart-item-image {
  max-width: 54px;
  max-height: 54px;
}
.header__cart-item-image img {
  max-width: 54px;
  max-height: 54px;
}

.header__cart-item p {
  margin: 0;
}

.header__cart-item-qty-input {
  width: 40px;
  height: 44px;
  text-align: center;
  font-size: 14px;
  border: none;
  outline: none;
}

.header__cart-item-qty {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  background: white;
}

.header__cart-item-increase {
  position: absolute;
  top: 7px;
  right: 2px;
}

.header__cart-item-decrease {
  position: absolute;
  bottom: -1px;
  right: 3px;
}

.header__cart-item-qty-input::-webkit-outer-spin-button,
.header__cart-item-qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.header__cart-item-price {
  margin-left: auto;
}
</style>

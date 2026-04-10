<template>
  <div class="header__cart">
    <div class="header__cart-icon" @click="toggleCart">
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
      :class="[
        'header__cart--open',
        { 'header__cart-panel--visible': isCartOpen },
      ]"
    >
      <div class="header__cart-container">
        <h3 class="header__cart-review">Shopping Cart</h3>
        <div class="header__cart-close" @click="closeCart">
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
        <div class="header__cart-items">
          <cart-item
            v-for="cartItem in cartItems"
            :key="cartItem.product.id"
            :id="cartItem.product.id"
            :title="cartItem.product.title"
            :thumbnail="cartItem.product.thumbnail"
            :price="cartItem.product.price"
          ></cart-item>
        </div>
        <cart-payment></cart-payment>
      </div>
      <base-button>Place Order</base-button>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import CartPayment from "./CartPayment.vue";
export default {
  components: { CartItem, CartPayment },
  data() {
    return {
      isCartOpen: false,
    };
  },
  computed: {
    cartQuantity() {
      return this.$store.getters["cart/cartQuantity"];
    },
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    closeCart() {
      this.isCartOpen = false;
    },
  },
};
</script>

<style scoped>
.header__cart {
  position: relative;
  cursor: pointer;
  margin-left: 10px;
}

.header__cart-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header__cart-items-grid {
  display: grid;
  height: 85%;
  align-content: space-between;
  row-gap: 15px;
}

.header__cart-items {
  overflow-y: auto;
}

.header__cart-review {
  font-size: 20px;
  letter-spacing: 2px;
}

.header__cart-close {
  cursor: pointer;
}

.header__cart-close svg {
  width: 15px;
  height: 15px;
}

.header__cart--open {
  position: fixed;
  width: 460px;
  height: 100%;
  background-color: white;
  top: 0;
  right: 0;
  overflow-y: auto;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 200;
  transform: translateX(100%);
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  padding: 20px;
  pointer-events: none;
}

.header__cart-panel--visible {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.header__cart-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  background-color: #cf403f;
  border-radius: 50%;
  position: absolute;
  top: -7px;
  right: -2px;
}

.header__cart-count {
  font-size: 10px;
  color: white;
}

/* MEDIA QUERIES */
@media (max-width: 1024px) {
  .header__cart {
    margin-left: 5px;
  }
}

@media (max-width: 425px) {
  .header__cart--open {
    width: 260px;
  }
  .header__cart-review {
    font-size: 16px;
  }
}

@media (max-width: 320px) {
  .header__cart--open {
    width: 260px;
  }
}
</style>

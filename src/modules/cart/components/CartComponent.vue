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
      <div class="header__cart-badge">
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
        <h3 class="header__cart-review">Review Your Cart</h3>
        <div class="header__cart-close" @click="closeCart">
          <svg
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 460.775 460.775"
            xml:space="preserve"
          >
            <path
              d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCartOpen: false,
    };
  },
  computed: {
    cartQuantity() {
      return this.$store.getters["cart/cartQuantity"];
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
  width: 420px;
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
  font-size: 12px;
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

<template>
  <div class="header">
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
    <header class="header__inner">
      <div
        :class="[
          'header__mobile-menu',
          { 'header__mobile-menu--open': isMenuOpen },
        ]"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.id"
          class="header__mobile-link"
          :to="link.to"
          :exact="link.exact"
          >{{ link.name }}</RouterLink
        >
      </div>
      <nav class="header__nav">
        <h1 class="header__logo">Exclusive</h1>
        <ul class="header__nav-links">
          <li v-for="link in navLinks" :key="link.id" class="header__nav-item">
            <RouterLink
              class="header__nav-link"
              :to="link.to"
              :exact="link.exact"
              >{{ link.name }}</RouterLink
            >
          </li>
        </ul>
        <div class="header__actions">
          <div class="header__search">
            <input
              class="header__search-input"
              type="text"
              placeholder="What are you looking for?"
            />
            <div class="header__search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>
          </div>

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
                <p class="header__cart-count">2</p>
              </div>
            </div>
          </div>
          <div class="header__hamburger" @click="toggleMenu">☰</div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      navLinks: [
        {
          id: 1,
          to: "/",
          name: "Home",
          exact: true,
        },
        {
          id: 2,
          to: "/contact",
          name: "Contact",
        },
        {
          id: 3,
          to: "/products",
          name: "Products",
        },
        {
          id: 4,
          to: "/about",
          name: "About",
        },
      ],
      isMenuOpen: false,
      isCartOpen: false,
    };
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
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
.header {
  padding: 0 20px;
  border-bottom: 1px solid black;
  overflow: hidden;
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 96px;
  margin-bottom: 10px;
  max-width: 1440px;
  margin-inline: auto;
}

.header__nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.header__nav-item {
  list-style-type: none;
  font-weight: 500;
}

.header__nav-link {
  text-decoration: none;
  color: inherit;
}

.header__nav-link.router-link-active {
  border-bottom: 1px solid #7b7b7b;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__search {
  position: relative;
  display: flex;
  align-items: center;
}

.header__search-input {
  padding: 7px 50px 7px 20px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  outline: none;
}

.header__search-input::placeholder {
  color: #7b7b7b;
}

.header__search-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 7px;
  cursor: pointer;
}

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

.header__hamburger {
  display: none;
  font-size: 24px;
  cursor: pointer;
}

.header__mobile-menu {
  display: none;
}

/* MEDIA QUERIES */
@media (max-width: 1024px) {
  .header__search-input {
    width: 230px;
  }
  .header__cart {
    margin-left: 5px;
  }
}

@media (max-width: 768px) {
  .header__nav {
    margin-top: 40px;
  }
  .header__nav-links {
    display: none;
  }
  .header__search-input {
    display: none;
  }
  .header__search-icon {
    position: static;
  }
  .header__hamburger {
    display: block;
    margin-bottom: 6px;
    margin-left: 4px;
  }
  .header__actions {
    gap: 1rem;
  }

  .header__mobile-menu {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    border-top: 1px solid #eee;
    z-index: 100;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 1s ease, opacity 1s ease;
  }

  .header__mobile-menu--open {
    min-height: 100vh;
    opacity: 1;
    padding: 2rem 0;
  }

  .header__mobile-link {
    text-decoration: none;
    color: black;
    font-size: 18px;
    display: block;
    width: 100%;
    border-bottom: 1px solid #333;
    text-align: center;
    padding: 1rem;
    cursor: pointer;
  }

  .header__mobile-link:first-child {
    border-top: 1px solid #333;
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

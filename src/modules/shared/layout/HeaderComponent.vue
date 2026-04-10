<template>
  <div class="header">
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
          <cart-component></cart-component>
          <div class="header__hamburger" @click="toggleMenu">☰</div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import CartComponent from "@/modules/cart/components/CartComponent.vue";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
    CartComponent,
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

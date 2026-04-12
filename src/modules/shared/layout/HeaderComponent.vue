<template>
  <div class="header">
    <div
      v-if="isSearchOpen"
      class="header__search-overlay"
      @click.self="closeSearch"
    >
      <div class="header__search-overlay-inner">
        <div class="header__search-overlay-input-wrapper">
          <input
            ref="mobileSearch"
            class="header__search-overlay-input"
            type="text"
            placeholder="What are you looking for?"
            v-model="searchQuery"
            @input="handleSearchInput"
            @keyup.enter="handleSearch"
          />
          <div class="header__search-overlay-icon" @click="handleSearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
        <div
          v-if="searchResults.length > 0 || searchLoading || showNoResults"
          class="header__search-dropdown"
        >
          <div v-if="searchLoading" class="header__search-dropdown-loading">
            <base-loader size="24px"></base-loader>
          </div>
          <div
            v-else-if="searchResults.length > 0"
            v-for="result in searchResults"
            :key="result.id"
            class="header__search-dropdown-item"
            @click="handleSelectResult(result)"
          >
            <img :src="result.thumbnail" :alt="result.title" />
            <div class="header__search-dropdown-info">
              <p class="header__search-dropdown-title">{{ result.title }}</p>
              <p class="header__search-dropdown-price">${{ result.price }}</p>
            </div>
          </div>
          <div v-else class="header__search-dropdown-empty">
            No products found
          </div>
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
              v-model="searchQuery"
              @input="handleSearchInput"
              @keyup.enter="handleSearch"
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
            <div
              v-if="searchResults.length > 0 || searchLoading || showNoResults"
              class="header__search-dropdown"
            >
              <div v-if="searchLoading" class="header__search-dropdown-loading">
                <base-loader size="24px"></base-loader>
              </div>
              <div
                v-else-if="searchResults.length > 0"
                v-for="result in searchResults"
                :key="result.id"
                class="header__search-dropdown-item"
                @click="handleSelectResult(result)"
              >
                <img :src="result.thumbnail" :alt="result.title" />
                <div class="header__search-dropdown-info">
                  <p class="header__search-dropdown-title">
                    {{ result.title }}
                  </p>
                  <p class="header__search-dropdown-price">
                    ${{ result.price }}
                  </p>
                </div>
              </div>
              <div v-else class="header__search-dropdown-empty">
                No products found
              </div>
            </div>
          </div>

          <div class="header__search-mobile-icon" @click="openSearch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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

          <cart-component></cart-component>
          <div class="header__hamburger" @click="toggleMenu">☰</div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { slugify } from "@/mixins/slugify";
import CartComponent from "@/modules/cart/components/CartComponent.vue";
import { getProductBySearchQuery } from "@/services/product.service";
import { RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
    CartComponent,
  },
  data() {
    return {
      searchLoading: false,
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
      isSearchOpen: false,
      searchQuery: "",
      searchResults: [],
      searchTimeout: null,
    };
  },
  watch: {
    $route() {
      this.isMenuOpen = false;
      this.isSearchOpen = false;
      this.searchQuery = "";
      this.searchResults = [];
    },
  },
  computed: {
    showNoResults() {
      return (
        this.searchQuery.trim().length > 0 &&
        !this.searchLoading &&
        this.searchResults.length === 0
      );
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    openSearch() {
      this.isSearchOpen = true;
      this.$nextTick(() => {
        this.$refs.mobileSearch?.focus();
      });
    },
    closeSearch() {
      this.isSearchOpen = false;
      this.searchQuery = "";
    },
    handleSearchInput() {
      clearTimeout(this.searchTimeout);

      if (!this.searchQuery.trim()) {
        this.searchResults = [];
        return;
      }

      this.searchTimeout = setTimeout(async () => {
        this.searchLoading = true;
        try {
          const { currentProducts } = await getProductBySearchQuery(
            this.searchQuery
          );
          console.log("results:", currentProducts);

          this.searchResults = currentProducts.slice(0, 6);
        } catch (error) {
          this.searchResults = [];
        } finally {
          this.searchLoading = false;
        }
      }, 300);
    },
    handleSearch() {
      if (this.searchResults.length > 0) {
        this.handleSelectResult(this.searchResults[0]);
      }
    },
    handleSelectResult(product) {
      this.$store.commit("products/SET_SELECTED_PRODUCT_DIRECT", product);
      const slug = slugify(product.title);

      const targetPath = `/products/${slug}`;
      if (this.$route.path === targetPath) return;
      this.$router.push(`/products/${slug}`);

      this.searchQuery = "";
      this.searchResults = [];
      this.isSearchOpen = false;
    },
  },
};
</script>

<style scoped>
.header {
  padding: 0 20px;
  border-bottom: 1px solid black;
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

.header__search-overlay-input {
  width: 100%;
  padding: 14px 50px 14px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: white;
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

.header__search-dropdown-loading {
  display: flex;
  justify-content: center;
  padding: 16px;
}

.header__search-dropdown-empty {
  padding: 16px;
  text-align: center;
  color: #7b7b7b;
  font-size: 14px;
}

.header__hamburger {
  display: none;
  font-size: 24px;
  cursor: pointer;
}

.header__mobile-menu {
  display: none;
}

.header__search {
  position: relative;
}

.header__search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 300;
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
}

.header__search-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.header__search-dropdown-item:hover {
  background: #f5f5f5;
}

.header__search-dropdown-item img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 4px;
  background: #f5f5f5;
}

.header__search-dropdown-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header__search-dropdown-title {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.header__search-dropdown-price {
  font-size: 13px;
  color: #db4444;
}

.header__search-overlay-input-wrapper {
  position: relative;
}

.header__search-overlay-inner .header__search-dropdown {
  position: static;
  margin-top: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  max-height: 60vh;
  overflow-y: auto;
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

.header__search-mobile-icon {
  display: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.header__search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  padding-top: 80px;
}

.header__search-overlay-inner {
  width: 90%;
  margin: 0 auto;
}

.header__search-overlay-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header__search-mobile-icon {
    display: block;
  }

  .header__search {
    display: none;
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

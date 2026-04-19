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

<script setup>
import { useSearch } from "@/composables/useSearch";
import CartComponent from "@/modules/cart/components/CartComponent.vue";
import { nextTick, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const {
  showNoResults,
  handleSearchInput,
  handleSearch,
  handleSelectResult,
  searchLoading,
  searchQuery,
  searchResults,
} = useSearch();

const navLinks = [
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
];

const isMenuOpen = ref(false);
const isSearchOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
    isSearchOpen.value = false;
  }
);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

const mobileSearch = ref(null);
function openSearch() {
  isSearchOpen.value = true;
  nextTick(() => {
    mobileSearch.value?.focus();
  });
}

function closeSearch() {
  isSearchOpen.value = false;
  searchQuery.value = "";
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/layout/header";
</style>

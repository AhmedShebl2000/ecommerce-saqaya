<template>
  <div>
    <base-bread-crumb :items="breadcrumbItems"></base-bread-crumb>
    <div class="product" v-if="selectedProduct">
      <div class="product__details-grid">
        <div class="product__side-photos-grid">
          <div v-for="index in 4" :key="index" class="product__side-image">
            <img :src="selectedProduct.images[0]" />
          </div>
        </div>
        <div class="product__main-photo">
          <img :src="selectedProduct.images[0]" />
        </div>
        <div class="product__description">
          <div class="product__top-description">
            <h2 class="product__title">{{ selectedProduct.title }}</h2>
            <div class="product__rating-stock">
              <div>
                <base-rating-component
                  :rating="selectedProduct.rating"
                  :ratingCount="ratingCount"
                ></base-rating-component>
              </div>
              <div>({{ ratingCount }} Reviews) |</div>
              <div :class="{ 'in-stock': inStock, 'out-of-stock': !inStock }">
                {{ inStock ? "In Stock" : "Out of Stock" }}
              </div>
            </div>
            <div class="product__price-discount">
              <span class="product__price">${{ selectedProduct.price }}</span>
              <div v-if="hasDiscountPercentage" class="product__discount">
                -{{ selectedProduct.discountPercentage }}%
              </div>
            </div>
            <p class="product__description">
              {{ selectedProduct.description }}
            </p>
          </div>
          <div class="product__bottom-description">
            <p>
              Category:
              <span class="product__bottom-category">{{
                selectedProduct.category
              }}</span>
            </p>
            <div class="product__cart-selection">
              <div class="product__cart-count">
                <div class="product__cart-deduct" @click="decreaseItemQty">
                  -
                </div>
                <p class="product__cart-items-count">{{ itemQty }}</p>
                <div class="product__cart-increase" @click="increaseItemQty">
                  +
                </div>
              </div>
              <div class="product__cart-btn">
                <base-button>Buy now</base-button>
              </div>
              <div class="product__wishlist-logo">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div class="product__delivery-content">
              <div class="product__delivery-row">
                <div class="product__delivery-icon">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_261_4843)">
                      <path
                        d="M11.6668 31.6667C13.5078 31.6667 15.0002 30.1743 15.0002 28.3333C15.0002 26.4924 13.5078 25 11.6668 25C9.82588 25 8.3335 26.4924 8.3335 28.3333C8.3335 30.1743 9.82588 31.6667 11.6668 31.6667Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.3335 28.3335H7.00016C5.89559 28.3335 5.00016 27.4381 5.00016 26.3335V21.6668M3.3335 8.3335H19.6668C20.7714 8.3335 21.6668 9.22893 21.6668 10.3335V28.3335M15.0002 28.3335H25.0002M31.6668 28.3335H33.0002C34.1047 28.3335 35.0002 27.4381 35.0002 26.3335V18.3335M35.0002 18.3335H21.6668M35.0002 18.3335L30.5828 10.9712C30.2213 10.3688 29.5703 10.0002 28.8678 10.0002H21.6668"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 11.8181H11.6667"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1.81836 15.4546H8.48503"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 19.0908H11.6667"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4843">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="product__delivery-text">
                  <p class="product__delivery-title">Free Delivery</p>
                  <p class="product__delivery-subtitle">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              <div class="divider"></div>

              <div class="product__delivery-row">
                <div class="product__delivery-icon">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_261_4865)">
                      <path
                        d="M33.3332 18.3334C32.9256 15.4004 31.565 12.6828 29.4609 10.5992C27.3569 8.51563 24.6261 7.18161 21.6893 6.80267C18.7525 6.42372 15.7725 7.02088 13.2085 8.50216C10.6445 9.98343 8.63859 12.2666 7.49984 15.0001M6.6665 8.33341V15.0001H13.3332"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.6665 21.6667C7.0741 24.5997 8.43472 27.3173 10.5388 29.4009C12.6428 31.4845 15.3736 32.8186 18.3104 33.1975C21.2472 33.5764 24.2271 32.9793 26.7912 31.498C29.3552 30.0167 31.3611 27.7335 32.4998 25.0001M33.3332 31.6667V25.0001H26.6665"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4865">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="product__delivery-text">
                  <p class="product__delivery-title">Return Delivery</p>
                  <p class="product__delivery-subtitle">
                    Free 30 Days Delivery Returns.
                    <span class="link">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <base-header>More of this category</base-header>
        <div v-if="loading" class="product__loading">
          <base-loader size="56px"></base-loader>
        </div>

        <base-error
          v-else-if="error"
          :message="error"
          @retry="getProductsOfSameCategory"
        ></base-error>
        <div v-else class="product__same-category">
          <div v-for="product in sameCategoryProducts" :key="product.id">
            <product-item
              :id="product.id"
              :images="product.images"
              :title="product.title"
              :price="product.price"
              :discountPercentage="product.discountPercentage"
              :rating="product.rating"
              :ratingCount="product.reviews?.length || 0"
            ></product-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProductById } from "@/services/product.service";
import ProductItem from "../components/ProductItem.vue";
import { slugify } from "@/composables/slugify";
import { useProductsStore } from "../store/products";
import { useCartStore } from "@/modules/cart/store/cart";
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const productsStore = useProductsStore();
const cartStore = useCartStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  loadProduct();
});

async function loadProduct() {
  const productId = Number(route.params.productId);

  if (!productId || Number.isNaN(productId)) {
    return router.replace({ name: "notFound" }); //redirection
  }

  try {
    const product = await getProductById(productId);
    const correctSlug = slugify(product.title);
    const currentSlug = route.params.productSlug;

    if (currentSlug !== correctSlug) {
      return router.replace({
        name: "product",
        params: {
          productId: product.id,
          productSlug: correctSlug,
        },
        replace: true,
      });
    }

    productsStore.setSelectedProductDirect(product);
    await getProductsOfSameCategory();
  } catch (error) {
    router.replace({ name: "notFound" });
  }
}

onBeforeRouteUpdate(async (to) => {
  const productId = Number(to.params.productId);

  if (!productId || Number.isNaN(productId)) {
    return router.replace({ name: "notFound" }); //redirection
  }

  try {
    const product = await getProductById(productId);
    const correctSlug = slugify(product.title);
    const currentSlug = to.params.productSlug;

    if (currentSlug !== correctSlug) {
      return router.replace({
        name: "product",
        params: {
          productId: product.id,
          productSlug: correctSlug,
        },
      });
    }

    productsStore.setSelectedProductDirect(product);
    await getProductsOfSameCategory();
  } catch (error) {
    router.replace({ name: "notFound" });
  }
});

const loading = ref(false);
const error = ref(null);

const selectedProduct = computed(() => {
  return productsStore.selectedProduct;
});

const ratingCount = computed(() => {
  return selectedProduct.value.reviews?.length || 0;
});

const inStock = computed(() => {
  return selectedProduct.value.stock > 0;
});

const hasDiscountPercentage = computed(() => {
  return (selectedProduct.value.discountPercentage || 0) > 0;
});

const cartItems = computed(() => {
  return cartStore.cart.items;
});

const itemQty = computed(() => {
  const item = cartItems.value.find(
    (item) => item.product.id === selectedProduct.value.id
  );
  return item ? item.qty : 0;
});

const sameCategoryProducts = computed(() => {
  return productsStore.products;
});

const breadcrumbItems = computed(() => {
  return [
    { id: 1, label: "Home", to: "/" },
    {
      id: 2,
      label: "Products",
      to: "/products",
    },
    {
      id: 3,
      label: selectedProduct.value?.title || "product",
    },
  ];
});

function decreaseItemQty() {
  cartStore.decreaseQuantity(selectedProduct.value.id);
}
function increaseItemQty() {
  cartStore.addToCart(selectedProduct.value);
}

async function getProductsOfSameCategory() {
  const category = selectedProduct.value.category;
  try {
    loading.value = true;
    error.value = null;

    await productsStore.fetchProducts({ limit: 4, skip: 0, category });
  } catch (error) {
    error.value = "Failed to load related products.";
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/product-details";
</style>

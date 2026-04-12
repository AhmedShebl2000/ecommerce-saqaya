<template>
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
          <p class="product__description">{{ selectedProduct.description }}</p>
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
              <div class="product__cart-deduct" @click="decreaseItemQty">-</div>
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
</template>

<script>
import ProductItem from "../components/ProductItem.vue";
export default {
  components: { ProductItem },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  created() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(this.selectedProduct);
    this.getProductsOfSameCategory();
    console.log(this.sameCategoryProducts);
  },
  computed: {
    selectedProduct() {
      return this.$store.getters["products/selectedProduct"];
    },
    ratingCount() {
      return this.selectedProduct.reviews?.length || 0;
    },
    inStock() {
      return this.selectedProduct.stock > 0;
    },
    hasDiscountPercentage() {
      return (this.selectedProduct.discountPercentage || 0) > 0;
    },
    cartItems() {
      return this.$store.getters["cart/cartItems"];
    },
    itemQty() {
      const item = this.cartItems.find(
        (item) => item.product.id === this.selectedProduct.id
      );
      return item ? item.qty : 0;
    },
    sameCategoryProducts() {
      return this.$store.getters["products/products"];
    },
  },
  methods: {
    decreaseItemQty() {
      this.$store.commit("cart/DECREASE_QUANTITY", this.selectedProduct.id);
    },
    increaseItemQty() {
      this.$store.commit("cart/ADD_TO_CART", this.selectedProduct);
    },
    async getProductsOfSameCategory() {
      const category = this.selectedProduct.category;
      try {
        this.loading = true;
        this.error = null;
        await this.$store.dispatch("products/fetchProducts", {
          limit: 4,
          skip: 0,
          category,
        });
      } catch (error) {
        this.error = "Failed to load related products.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.product__details-grid {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  column-gap: 160px;
  margin-bottom: 60px;
}

.product__side-photos-grid {
  display: grid;
  grid-template-rows: repeat(4, 138px);
  row-gap: 30px;
}

.product__side-image {
  width: 170px;
  height: 138px;
}

.product__side-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.product__side-image,
.product__main-photo {
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.product__main-photo img {
  width: 100%;
  max-width: 446px;
  height: auto;
}

.product__title {
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 3%;
}

.product__rating-stock {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product__loading {
  display: flex;
  justify-content: center;
  padding: 120px 0;
}

.in-stock {
  color: #66ffa3;
}

.out-of-stock {
  color: red;
}

.product__description {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.product__price-discount {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.product__discount {
  background-color: #db4444;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.product__top-description,
.product__bottom-description {
  max-width: 373px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product__bottom-description {
  padding-top: 20px;
  border-bottom: none;
  gap: 20px;
}

.product__bottom-category {
  text-decoration: underline;
  text-transform: capitalize;
}

.product__cart-selection {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product__cart-count {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  border-radius: 2px;
}

.product__cart-deduct {
  cursor: pointer;
  padding: 12px;
  background-color: white;
  color: black;
  border-right: 1px solid black;
}

.product__cart-items-count {
  padding: 12px 20px;
}

.product__cart-increase {
  cursor: pointer;
  padding: 12px;
  background-color: #db4444;
  color: white;
  border-left: 1px solid black;
}

.product__wishlist-logo {
  border: 0.5px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  border-radius: 4px;
  cursor: pointer;
}
.product__wishlist-logo svg {
  width: 32px;
  height: 32px;
}
.product__cart-btn {
  font-size: 12px;
}

.product__delivery-content {
  border: 1px solid black;
  border-radius: 4px;
  overflow: hidden;
}

.product__delivery-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.divider {
  height: 1px;
  background-color: black;
  width: 100%;
}

.product__delivery-icon svg {
  width: 40px;
  height: 40px;
}

.product__delivery-text .product__delivery-title {
  font-weight: 600;
  font-size: 16px;
}

.product__delivery-text .product__delivery-subtitle {
  font-size: 14px;
  text-decoration: underline;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.product__same-category {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  margin-bottom: 80px;
  margin-top: 40px;
}

@media (max-width: 1200px) {
  .product__details-grid {
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
  }

  .product__side-photos-grid {
    grid-column: 1 /-1;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: none;
    margin-bottom: 50px;
  }
}

@media (max-width: 992px) {
  .product__details-grid {
    grid-template-columns: 1fr;
    row-gap: 24px;
    column-gap: 0;
  }

  .product__main-photo {
    order: -2;
  }

  .product__side-photos-grid {
    order: -1;
    grid-column: auto;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .product__main-photo img {
    max-width: 100%;
  }

  .product__description {
    width: 100%;
  }

  .product__top-description {
    max-width: 100%;
  }

  .product__bottom-description {
    max-width: 50%;
  }

  .product__same-category {
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }
}

@media (max-width: 768px) {
  .product__title {
    font-size: 20px;
  }

  .product__side-photos-grid {
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }

  .product__side-image {
    height: 110px;
  }

  .product__bottom-description {
    max-width: 100%;
  }

  .product__cart-selection {
    width: 100%;
  }

  .product__cart-btn {
    width: 100%;
  }

  .product__same-category {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .product__cart-selection {
    display: grid;
    grid-template-columns: 140px 1fr auto;
  }

  .product__cart-btn :deep(button) {
    width: 100%;
  }

  .product__cart-count {
    width: 100%;
    justify-content: space-between;
  }

  .product__cart-btn {
    width: 100%;
  }

  .product__wishlist-logo {
    width: 44px;
    height: 44px;
  }
}
</style>

/**
 * Products Store
 *
 * Manages all product data fetched from the DummyJSON API.
 * Handles product listings, home page products, flash sale products,
 * search results, and the currently selected product detail.
 *
 * State:
 *  - products: ProductType[] — paginated product list for /products page
 *  - homeProducts: ProductType[] — featured products shown on homepage
 *  - flashSalesProducts: ProductType[] — random products for flash sale
 *  - totalProducts: number — total count for pagination
 *  - selectedProduct: ProductType | null — product being viewed in detail
 *  - searchedProducts: ProductType[] — results from search queries
 *
 * Actions:
 *  - fetchProducts(payload) — fetches paginated/filtered product list
 *  - fetchHomeProducts() — fetches 8 products for the homepage
 *  - fetchFlashSaleProducts() — fetches 50 and picks 10 randomly
 *  - fetchSearchedProduct(payload) — searches products by query string
 *  - setSelectedProduct(id) — finds product from existing state by id
 *  - setSelectedProductDirect(product) — sets product directly from API response
 */

import { ProductType } from "@/types";
import { defineStore } from "pinia";

import {
  getAllProducts,
  getProductBySearchQuery,
  getProductsByCategory,
} from "@/services/product.service";
import { shuffle } from "@/composables/shuffle";
import { getItem, removeItem, setItem } from "@/modules/shared/utils/storage";

interface ProductsState {
  products: ProductType[];
  homeProducts: ProductType[];
  flashSalesProducts: ProductType[];
  totalProducts: number;
  selectedProduct: ProductType | null;
  searchedProducts: ProductType[];
}

interface FetchProductsPayload {
  limit: number;
  skip: number;
  category?: string;
}

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as ProductType[],
    homeProducts: [] as ProductType[],
    flashSalesProducts: [] as ProductType[],
    totalProducts: 0,
    selectedProduct: getItem<ProductType>(
      "selectedProduct"
    ) as ProductType | null,
    searchedProducts: [] as ProductType[],
  }),
  actions: {
    async fetchProducts(payload: FetchProductsPayload) {
      try {
        const { currentProducts, total } = payload.category
          ? await getProductsByCategory(
              payload.limit,
              payload.skip,
              payload.category
            )
          : await getAllProducts(payload.limit, payload.skip);

        if (payload.skip === 0) {
          this.products = currentProducts;
          this.totalProducts = total;
        } else {
          this.products = [...this.products, ...currentProducts];
          this.totalProducts = total;
        }
      } catch (error) {
        throw new Error("Something went wrong fetching the products!");
      }
    },
    async fetchHomeProducts() {
      try {
        const { currentProducts } = await getAllProducts(8, 0);
        this.homeProducts = currentProducts;
      } catch (error) {
        throw new Error("Something went wrong fetching home products!");
      }
    },
    async fetchFlashSaleProducts() {
      try {
        const { currentProducts } = await getAllProducts(50, 0);
        const shuffledArr = shuffle(currentProducts);
        const randomProducts = shuffledArr.slice(0, 10);
        this.flashSalesProducts = randomProducts;
      } catch (error) {
        throw new Error("Something went wrong fetching flash sale products!");
      }
    },
    async fetchSearchedProduct(payload: { searchQuery: string }) {
      try {
        const { currentProducts } = await getProductBySearchQuery(
          payload.searchQuery
        );
        this.searchedProducts = currentProducts;
      } catch (error) {
        throw new Error("Something went wrong fetching searched products!");
      }
    },
    setSelectedProduct(id: number) {
      const product =
        this.products.find((product) => product.id === id) ||
        this.homeProducts.find((product) => product.id === id) ||
        this.flashSalesProducts.find((product) => product.id === id) ||
        null;

      if (product) {
        this.selectedProduct = product;
        setItem("selectedProduct", product);
      } else {
        removeItem("selectedProduct");
      }
    },
    setSelectedProductDirect(product: ProductType) {
      if (product) {
        this.selectedProduct = product;
        setItem("selectedProduct", product);
      } else {
        this.selectedProduct = null;
        removeItem("selectedProduct");
      }
    },
  },
});

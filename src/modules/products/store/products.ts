import {
  getAllProducts,
  getProductsByCategory,
} from "@/services/product.service";
import { shuffle } from "@/mixins/shuffle";
import { ActionContext } from "vuex";
import { ProductType } from "@/types";

interface ProductsState {
  products: ProductType[];
  homeProducts: ProductType[];
  flashSalesProducts: ProductType[];
  totalProducts: number;
  selectedProduct: ProductType | null;
}

interface FetchProductsPayload {
  limit: number;
  skip: number;
  category?: string;
}

export const productsStore = {
  namespaced: true,
  state(): ProductsState {
    return {
      products: [],
      homeProducts: [],
      flashSalesProducts: [],
      totalProducts: 0,
      selectedProduct: null,
    };
  },
  getters: {
    products(state: ProductsState) {
      return state.products;
    },
    homeProducts(state: ProductsState) {
      return state.homeProducts;
    },
    flashSaleProducts(state: ProductsState) {
      return state.flashSalesProducts;
    },
    totalProducts(state: ProductsState) {
      return state.totalProducts;
    },
    selectedProduct(state: ProductsState) {
      return state.selectedProduct;
    },
  },
  mutations: {
    SET_PRODUCTS(state: ProductsState, currentProducts: ProductType[]) {
      state.products = currentProducts;
    },
    SET_HOME_PRODUCTS(state: ProductsState, products: ProductType[]) {
      state.homeProducts = products;
    },
    APPEND_PRODUCTS(
      state: ProductsState,
      payload: { currentProducts: ProductType[]; total: number }
    ) {
      state.products = [...state.products, ...payload.currentProducts];
      if (payload.total !== undefined) {
        state.totalProducts = payload.total;
      }
    },
    SET_FLASH_SALE(state: ProductsState, currentProducts: ProductType[]) {
      state.flashSalesProducts = currentProducts;
    },
    SET_SELECTED_PRODUCT(state: ProductsState, id: number) {
      if (state.products.length === 0) return;
      const product =
        state.products.find((product) => product.id === id) ||
        state.flashSalesProducts.find((product) => product.id === id);
      if (product) {
        state.selectedProduct = product;
      }
    },
  },
  actions: {
    async fetchProducts(
      context: ActionContext<ProductsState, any>,
      payload: FetchProductsPayload
    ) {
      try {
        const { currentProducts, total } = payload.category
          ? await getProductsByCategory(
              payload.limit,
              payload.skip,
              payload.category
            )
          : await getAllProducts(payload.limit, payload.skip);

        if (payload.skip === 0) {
          context.commit("SET_PRODUCTS", currentProducts);
          context.commit("APPEND_PRODUCTS", { currentProducts: [], total });
        } else {
          context.commit("APPEND_PRODUCTS", { currentProducts, total });
        }
      } catch (error) {
        throw new Error("Something went wrong fetching the products!");
      }
    },
    async fetchHomeProducts(context: ActionContext<ProductsState, any>) {
      try {
        const { currentProducts } = await getAllProducts(8, 0);
        context.commit("SET_HOME_PRODUCTS", currentProducts);
      } catch (error) {
        throw new Error("Something went wrong fetching home products!");
      }
    },
    async fetchFlashSaleProducts({
      commit,
    }: ActionContext<ProductsState, any>) {
      try {
        const { currentProducts } = await getAllProducts(50, 0);
        const shuffledArr = shuffle(currentProducts);
        const randomProducts = shuffledArr.slice(0, 10);
        commit("SET_FLASH_SALE", randomProducts);
      } catch (error) {
        throw new Error("Something went wrong fetching flash sale products!");
      }
    },
  },
};

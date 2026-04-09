import { getAllProducts } from "@/services/product.service";
import { shuffle } from "@/mixins/shuffle";
import { ActionContext } from "vuex";
import { ProductType } from "@/types";

interface ProductsState {
  products: ProductType[];
  flashSalesProducts: ProductType[];
  totalProducts: number;
  selectedProduct: ProductType | null;
}

interface FetchProductsPayload {
  limit: number;
  skip: number;
}

export const productsStore = {
  namespaced: true,
  state(): ProductsState {
    return {
      products: [],
      flashSalesProducts: [],
      totalProducts: 0,
      selectedProduct: {
        id: 0,
        title: "",
        description: "",
        category: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        tags: [],
        brand: "",
        sku: "",
        weight: 0,
        dimensions: {
          width: 0,
          height: 0,
          depth: 0,
        },
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "",
        reviews: [],
        returnPolicy: "",
        minimumOrderQuantity: 0,
        meta: {
          createdAt: "",
          updatedAt: "",
          barcode: "",
          qrCode: "",
        },
        thumbnail: "",
        images: [],
      },
    };
  },
  getters: {
    products(state: ProductsState) {
      return state.products;
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
      if (state.products.length === 0) return {};
      const product = state.products.find((product) => product.id === id);
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
        const { currentProducts, total } = await getAllProducts(
          payload.limit,
          payload.skip
        );
        if (payload.skip !== 0 && payload.limit !== 50) {
          context.commit("APPEND_PRODUCTS", { currentProducts, total });
        } else {
          context.commit("SET_PRODUCTS", currentProducts);
        }
      } catch (error) {
        throw new Error("Something went wrong fetching the products!");
      }
    },

    async fetchFlashSaleProducts({
      state,
      commit,
      dispatch,
    }: ActionContext<ProductsState, any>) {
      if (state.products.length === 0) {
        await dispatch("fetchProducts", { limit: 50, skip: 0 });
      }

      const shuffledArr = shuffle(state.products);
      const randomProducts = shuffledArr.slice(0, 10);
      commit("SET_FLASH_SALE", randomProducts);
    },
  },
};

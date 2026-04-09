import { getAllProducts } from "@/api/products";
import { shuffle } from "@/helpers/shuffle";
import { ActionContext } from "vuex";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

interface ProductsState {
  products: ProductType[];
  flashSalesProducts: ProductType[];
  totalProducts: number;
  selectedProduct: ProductType;
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
    setProducts(state: ProductsState, currentProducts: ProductType[]) {
      state.products = currentProducts;

      console.log("products: ", currentProducts);
    },
    appendProducts(
      state: ProductsState,
      payload: any
      // currentProducts: ProductType[],
      // total: number
    ) {
      state.products = [...state.products, ...payload.currentProducts];
      if (payload.total !== undefined) {
        console.log("HEREEEE", payload.total);
        state.totalProducts = payload.total;
      }
    },
    setFlashSale(state: ProductsState, currentProducts: ProductType[]) {
      state.flashSalesProducts = currentProducts;
      console.log("flash sale products: ", currentProducts);
    },
    setSelectedProduct(state: ProductsState, id: number) {
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
          console.log("TOTAL NUMBER OF PRODUCTS: ", total);
          context.commit("appendProducts", { currentProducts, total });
        } else {
          context.commit("setProducts", currentProducts);
        }
      } catch (error) {
        throw new Error("Something went wrong fetching the products!");
      }
    },

    async fetchFlashSaleProducts({
      state,
      commit,
      dispatch,
    }: {
      state: ProductsState;
      commit: (type: string, payload?: any) => void;
      dispatch: (type: string, payload?: any) => Promise<any>;
    }) {
      if (state.products.length === 0) {
        await dispatch("fetchProducts", { limit: 50, skip: 0 });
      }

      const shuffledArr = shuffle(state.products);
      const randomProducts = shuffledArr.slice(0, 10);
      commit("setFlashSale", randomProducts);
    },
  },
};

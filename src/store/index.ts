import Vue from "vue";
import Vuex from "vuex";
import { productsStore } from "@/modules/products/store/products";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    products: productsStore,
  },
});

export default store;

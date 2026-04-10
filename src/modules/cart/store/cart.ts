import { CartItem, CartType, ProductType } from "@/types";

interface CartState {
  cart: CartType;
}

export const cartStore = {
  namespaced: true,
  state() {
    return {
      cart: {
        items: [],
      },
    };
  },
  getters: {
    cart(state: CartState) {
      return state.cart;
    },
    cartItems(state: CartState) {
      return state.cart.items;
    },
    cartQuantity(state: CartState) {
      return state.cart.items.reduce((sum, item) => sum + item.qty, 0);
    },
    cartTotal(state: CartState) {
      return state.cart.items.reduce(
        (sum, item) => sum + item.product.price * item.qty,
        0
      );
    },
  },
  mutations: {
    ADD_TO_CART(state: CartState, item: ProductType) {
      const existingItem = state.cart.items.find(
        (cartItem) => cartItem.product.id === item.id
      );
      if (existingItem) {
        existingItem.qty++;
      } else {
        state.cart.items.push({ product: item, qty: 1 });
      }
    },
    REMOVE_FROM_CART(state: CartState, id: number) {
      state.cart.items = state.cart.items.filter(
        (item) => item.product.id !== id
      );
    },
    DECREASE_QUANTITY(state: CartState, id: number) {
      const existingItem = state.cart.items.find(
        (item) => item.product.id === id
      );
      if (!existingItem) {
        return;
      }
      if (existingItem.qty > 1) {
        existingItem.qty--;
      } else {
        state.cart.items = state.cart.items.filter(
          (item) => item.product.id !== id
        );
      }
    },
    CLEAR_CART(state: CartState) {
      state.cart.items = [];
    },
  },
  actions: {},
};

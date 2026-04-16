import { defineStore } from "pinia";
import { getItem, removeItem, setItem } from "@/modules/shared/utils/storage";
import { CartType, ProductType } from "@/types";

interface CartState {
  cart: CartType;
  isOpen: boolean;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart:
      getItem<CartType>("cart") ||
      ({
        items: [],
      } as CartType),
    isOpen: false,
  }),
  // getters: {
  //   cartItems(state: CartState) {
  //     return state.cart.items;
  //   },
  //   cartQuantity(state: CartState) {
  //     return state.cart.items.reduce((sum, item) => sum + item.qty, 0);
  //   },
  //   cartTotal(state: CartState) {
  //     return state.cart.items.reduce(
  //       (sum, item) => sum + item.product.price * item.qty,
  //       0
  //     );
  //   },
  //   isCartOpen(state: CartState) {
  //     return state.isOpen;
  //   },
  // },
  actions: {
    addToCart(item: ProductType) {
      const existingItem = this.cart.items.find(
        (cartItem) => cartItem.product.id === item.id
      );
      if (existingItem) {
        existingItem.qty++;
      } else {
        this.cart.items.push({ product: item, qty: 1 });
      }
      setItem("cart", this.cart);
    },
    removeFromCart(id: number) {
      this.cart.items = this.cart.items.filter(
        (item) => item.product.id !== id
      );

      setItem("cart", this.cart);
    },
    clearCart() {
      this.cart.items = [];
      removeItem("cart");
    },
    decreaseQuantity(id: number) {
      const existingItem = this.cart.items.find(
        (item) => item.product.id === id
      );
      if (!existingItem) {
        return;
      }
      if (existingItem.qty > 1) {
        existingItem.qty--;
      } else {
        this.cart.items = this.cart.items.filter(
          (item) => item.product.id !== id
        );
      }
      setItem("cart", this.cart);
    },
    toggleCart() {
      this.isOpen = !this.isOpen;
    },
    openCart() {
      this.isOpen = true;
    },
    closeCart() {
      this.isOpen = false;
    },
  },
});

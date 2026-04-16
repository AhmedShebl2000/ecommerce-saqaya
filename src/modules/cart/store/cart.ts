// import { getItem, removeItem, setItem } from "@/modules/shared/utils/storage";
// import { CartType, ProductType } from "@/types";

// interface CartState {
//   cart: CartType;
//   isOpen: boolean;
// }

// export const cartStore = {
//   namespaced: true,
//   state() {
//     return {
//       cart: getItem<CartType>("cart") || {
//         items: [],
//       },
//       isOpen: false,
//     };
//   },
//   getters: {
//     cart(state: CartState) {
//       return state.cart;
//     },
//     cartItems(state: CartState) {
//       return state.cart.items;
//     },
//     cartQuantity(state: CartState) {
//       return state.cart.items.reduce((sum, item) => sum + item.qty, 0);
//     },
//     cartTotal(state: CartState) {
//       return state.cart.items.reduce(
//         (sum, item) => sum + item.product.price * item.qty,
//         0
//       );
//     },
//     isCartOpen(state: CartState) {
//       return state.isOpen;
//     },
//   },
//   mutations: {
//     ADD_TO_CART(state: CartState, item: ProductType) {
//       const existingItem = state.cart.items.find(
//         (cartItem) => cartItem.product.id === item.id
//       );
//       if (existingItem) {
//         existingItem.qty++;
//       } else {
//         state.cart.items.push({ product: item, qty: 1 });
//       }

//       setItem("cart", state.cart);
//     },
//     REMOVE_FROM_CART(state: CartState, id: number) {
//       state.cart.items = state.cart.items.filter(
//         (item) => item.product.id !== id
//       );

//       setItem("cart", state.cart);
//     },
//     DECREASE_QUANTITY(state: CartState, id: number) {
//       const existingItem = state.cart.items.find(
//         (item) => item.product.id === id
//       );
//       if (!existingItem) {
//         return;
//       }
//       if (existingItem.qty > 1) {
//         existingItem.qty--;
//       } else {
//         state.cart.items = state.cart.items.filter(
//           (item) => item.product.id !== id
//         );
//       }
//       setItem("cart", state.cart);
//     },
//     CLEAR_CART(state: CartState) {
//       state.cart.items = [];
//       removeItem("cart");
//     },
//     TOGGLE_CART(state: CartState) {
//       state.isOpen = !state.isOpen;
//     },
//     OPEN_CART(state: CartState) {
//       state.isOpen = true;
//     },
//     CLOSE_CART(state: CartState) {
//       state.isOpen = false;
//     },
//   },
//   actions: {},
// };

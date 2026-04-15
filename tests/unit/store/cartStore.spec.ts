import { cartStore } from "@/modules/cart/store/cart";

//mocking local storage because real browser storage is not needed
//to keep testd predictable
jest.mock("@/modules/shared/utils/storage", () => ({
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import { setItem, removeItem } from "@/modules/shared/utils/storage";
import { ProductType } from "@/types";

const product1 = {
  id: 1,
  title: "Item 1",
  thumbnail: "img.png",
  price: 50,
} as ProductType;
const product2 = {
  id: 2,
  title: "Item 2",
  thumbnail: "img2.png",
  price: 30,
} as ProductType;

//return a new store each time so mutations don't affect each other
const createState = () => (cartStore.state as () => any)();

describe("cart mutations", () => {
  describe("ADD_TO_CART", () => {
    it("adds a new product to the cart", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].product).toEqual(product1);
      expect(state.cart.items[0].qty).toBe(1);
    });

    it("increments qty when product already exists", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.ADD_TO_CART(state, product1);
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].qty).toBe(2);
    });

    it("calls setItem after adding", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      expect(setItem).toHaveBeenCalledWith("cart", state.cart);
    });
  });

  describe("REMOVE_FROM_CART", () => {
    it("removes the product from the cart", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.ADD_TO_CART(state, product2);
      cartStore.mutations.REMOVE_FROM_CART(state, product1.id);
      expect(state.cart.items).toHaveLength(1);
      expect(state.cart.items[0].product.id).toBe(product2.id);
    });

    it("calls setItem after removing", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.REMOVE_FROM_CART(state, product1.id);
      expect(setItem).toHaveBeenCalledWith("cart", state.cart);
    });
  });

  describe("DECREASE_QUANTITY", () => {
    it("decrements qty when qty is greater than 1", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.DECREASE_QUANTITY(state, product1.id);
      expect(state.cart.items[0].qty).toBe(1);
    });

    it("removes the item when qty reaches 0", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.DECREASE_QUANTITY(state, product1.id);
      expect(state.cart.items).toHaveLength(0);
    });

    it("does nothing when product does not exist", () => {
      //covers early return condition; shouldn't crash.
      const state = createState();
      cartStore.mutations.DECREASE_QUANTITY(state, 999);
      expect(state.cart.items).toHaveLength(0);
    });

    it("calls setItem after decreasing", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.DECREASE_QUANTITY(state, product1.id);
      expect(setItem).toHaveBeenCalledWith("cart", state.cart);
    });
  });

  describe("CLEAR_CART", () => {
    it("empties the cart", () => {
      const state = createState();
      cartStore.mutations.ADD_TO_CART(state, product1);
      cartStore.mutations.CLEAR_CART(state);
      expect(state.cart.items).toHaveLength(0);
    });

    it("calls removeItem after clearing", () => {
      const state = createState();
      cartStore.mutations.CLEAR_CART(state);
      expect(removeItem).toHaveBeenCalledWith("cart");
    });
  });
});

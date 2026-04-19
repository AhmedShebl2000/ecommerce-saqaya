// import { cartStore } from "@/modules/cart/store/cart";

//mocking local storage because real browser storage is not needed
//to keep testd predictable
jest.mock("@/modules/shared/utils/storage", () => ({
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import { useCartStore } from "@/modules/cart/store/cart";
import { setItem, removeItem } from "@/modules/shared/utils/storage";
import { ProductType } from "@/types";
import { createPinia, setActivePinia } from "pinia";

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
// const createState = () => (cartStore.state as () => any)();

describe("cart store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    jest.clearAllMocks();
  });

  describe("addToCart", () => {
    it("adds a new product to the cart", () => {
      const store = useCartStore();
      store.addToCart(product1);
      expect(store.cart.items).toHaveLength(1);
      expect(store.cart.items[0].product).toEqual(product1);
      expect(store.cart.items[0].qty).toBe(1);
    });

    it("increments qty when product already exists", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.addToCart(product1);
      expect(store.cart.items).toHaveLength(1);
      expect(store.cart.items[0].qty).toBe(2);
    });

    it("calls setItem after adding", () => {
      const store = useCartStore();
      store.addToCart(product1);
      expect(setItem).toHaveBeenCalledWith("cart", store.cart);
    });
  });

  describe("removeFromCart", () => {
    it("removes the product from the cart", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.addToCart(product2);
      store.removeFromCart(product1.id);
      expect(store.cart.items).toHaveLength(1);
      expect(store.cart.items[0].product.id).toBe(product2.id);
    });

    it("calls setItem after removing", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.removeFromCart(product1.id);
      expect(setItem).toHaveBeenCalledWith("cart", store.cart);
    });
  });

  describe("decreaseQuantity", () => {
    it("decrements qty when qty is greater than 1", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.addToCart(product1);
      store.decreaseQuantity(product1.id);
      expect(store.cart.items[0].qty).toBe(1);
    });

    it("removes the item when qty reaches 0", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.decreaseQuantity(product1.id);
      expect(store.cart.items).toHaveLength(0);
    });

    it("does nothing when product does not exist", () => {
      //covers early return condition; shouldn't crash.
      const store = useCartStore();
      store.decreaseQuantity(999);
      expect(store.cart.items).toHaveLength(0);
    });

    it("calls setItem after decreasing", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.addToCart(product1);
      store.decreaseQuantity(product1.id);
      expect(setItem).toHaveBeenCalledWith("cart", store.cart);
    });
  });

  describe("clearCart", () => {
    it("empties the cart", () => {
      const store = useCartStore();
      store.addToCart(product1);
      store.clearCart();
      expect(store.cart.items).toHaveLength(0);
    });

    it("calls removeItem after clearing", () => {
      const store = useCartStore();
      store.clearCart();
      expect(removeItem).toHaveBeenCalledWith("cart");
    });
  });
});

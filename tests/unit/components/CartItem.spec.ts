import CartItem from "@/modules/cart/components/CartItem.vue";
import { shallowMount } from "@vue/test-utils";

const $store = {
  getters: {
    "cart/cartItems": [
      {
        product: {
          id: 1,
          title: "Item 1",
          thumbnail: "image.png",
          price: 50,
        },
        qty: 1,
      },
    ],
  },
  commit: jest.fn(),
};

const createWrapper = () =>
  shallowMount(CartItem, {
    propsData: {
      id: 1,
      title: "Item 1",
      thumbnail: "image.png",
      price: 50,
    },
    mocks: {
      $store,
    },
  });

describe("CartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title", () => {
    const wrapper = createWrapper();
    expect(wrapper.find('[data-test="cart-item-title"]').text()).toContain(
      "Item 1"
    );
  });

  it("renders quantity from store", () => {
    const wrapper = createWrapper();
    expect(
      (wrapper.find('[data-test="cart-item-qty"]').element as HTMLInputElement)
        .value
    ).toBe("1");
  });

  it("renders rounded price based on quantity", () => {
    const wrapper = createWrapper();
    expect(wrapper.find('[data-test="cart-item-price"]').text()).toContain(
      "$50"
    );
  });

  it("commits ADD_TO_CART when increase button is clicked", async () => {
    const wrapper = createWrapper();
    await wrapper.find('[data-test="cart-item-increase"]').trigger("click");
    expect($store.commit).toHaveBeenCalledWith("cart/ADD_TO_CART", {
      id: 1,
      title: "Item 1",
      thumbnail: "image.png",
      price: 50,
    });
  });

  it("commits DECREASE_QUANTITY when decrease button is clicked", async () => {
    const wrapper = createWrapper();
    await wrapper.find('[data-test="cart-item-decrease"]').trigger("click");
    expect($store.commit).toHaveBeenCalledWith("cart/DECREASE_QUANTITY", 1);
  });

  it("commits REMOVE_FROM_CART when remove button is clicked", async () => {
    const wrapper = createWrapper();
    await wrapper.find('[data-test="cart-item-remove"]').trigger("click");
    expect($store.commit).toHaveBeenCalledWith("cart/REMOVE_FROM_CART", 1);
  });
});

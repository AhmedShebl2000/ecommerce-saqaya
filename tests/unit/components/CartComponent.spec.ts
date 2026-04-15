import CartComponent from "@/modules/cart/components/CartComponent.vue";
import CartItem from "@/modules/cart/components/CartItem.vue";
import CartPayment from "@/modules/cart/components/CartPayment.vue";
import BaseButton from "@/modules/shared/components/BaseButton.vue";
import { shallowMount } from "@vue/test-utils";

const $store = {
  getters: {
    "cart/cartItems": [],
    "cart/cartQuantity": 0,
    "cart/cartTotal": 0,
    "cart/isCartOpen": true,
  },
  commit: jest.fn(),
};

const $storeWithItems = {
  getters: {
    "cart/cartItems": [
      {
        product: {
          id: 1,
          thumbnail: "image.png",
          title: "Item 1",
          price: 50,
        },
        qty: 1,
      },
    ],
    "cart/cartQuantity": 1,
    "cart/cartTotal": 1200,
    "cart/isCartOpen": true,
  },
  commit: jest.fn(),
};

const stubs = {
  CartItem: true,
  CartPayment: true,
  BaseButton: true,
};

describe("CartComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title", () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store,
      },
      stubs,
    });
    expect(wrapper.find('[data-test="cart-title"]').text()).toContain(
      "Shopping Cart"
    );
  });
  it("renders empty cart", () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store,
      },
      stubs,
    });
    expect(wrapper.find('[data-test="cart-empty"]').text()).toContain(
      "You currently have no items in cart"
    );
  });
  it("renders cart with items", () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store: $storeWithItems,
      },
      stubs,
    });
    expect(wrapper.findComponent({ name: "CartItem" }).exists()).toBe(true);
  });
  it("close cart when button is clicked", async () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store,
      },
      stubs,
    });
    await wrapper.find('[data-test="cart-close"]').trigger("click");
    expect($store.commit).toHaveBeenCalledWith("cart/CLOSE_CART");
  });
  it("toggles cart when cart icon is clicked", async () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store,
      },
      stubs,
    });
    await wrapper.find('[data-test="cart-icon"]').trigger("click");
    expect($store.commit).toHaveBeenCalledWith("cart/TOGGLE_CART");
  });
  it("clears cart when cart clear cart is clicked", async () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store: $storeWithItems,
      },
      stubs: {
        CartItem: true,
        CartPayment: true,
        BaseButton: {
          template: "<button @click=\"$emit('click')\"><slot /></button>",
        },
      },
    });
    await wrapper.find('[data-test="clear-cart"] button').trigger("click");
    expect($storeWithItems.commit).toHaveBeenCalledWith("cart/CLEAR_CART");
  });
  it("does not render cart payment when cart is empty", () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store,
      },
      stubs,
    });
    expect(wrapper.findComponent({ name: "CartPayment" }).exists()).toBe(false);
  });
  it("renders cart payment when cart has items", () => {
    const wrapper = shallowMount(CartComponent, {
      mocks: {
        $store: $storeWithItems,
      },
      stubs,
    });

    expect(wrapper.findComponent({ name: "CartPayment" }).exists()).toBe(true);
  });
});

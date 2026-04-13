import CartPayment from "@/modules/cart/components/CartPayment.vue";
import { shallowMount } from "@vue/test-utils";

const $store = {
  getters: {
    "cart/cartTotal": 1200,
  },
};
const $storeWithRounded = {
  getters: {
    "cart/cartTotal": 1200.53,
  },
};

describe("CartPayment", () => {
  it("renders subtotal", () => {
    const wrapper = shallowMount(CartPayment, {
      mocks: {
        $store,
      },
    });

    expect(wrapper.find('[data-test="cart-subtotal"]').text()).toContain(
      "$1200"
    );
  });
  it("renders shipping as free", () => {
    const wrapper = shallowMount(CartPayment, {
      mocks: {
        $store,
      },
    });

    expect(wrapper.find('[data-test="cart-shipping"]').text()).toContain(
      "Free"
    );
  });
  it("renders total", () => {
    const wrapper = shallowMount(CartPayment, {
      mocks: {
        $store,
      },
    });

    expect(wrapper.find('[data-test="cart-total"]').text()).toContain("$1200");
  });
  it("renders rounded total from store", () => {
    const wrapper = shallowMount(CartPayment, {
      mocks: {
        $store: $storeWithRounded,
      },
    });

    expect(wrapper.find('[data-test="cart-total"]').text()).toContain("$1200");
  });
});

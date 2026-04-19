import CartPayment from "@/modules/cart/components/CartPayment.vue";
import { useCartStore } from "@/modules/cart/store/cart";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

const cartItemFixture = {
  product: {
    id: 1,
    thumbnail: "img.png",
    title: "Item 1",
    price: 1200,
  } as any,
  qty: 1,
};

describe("CartPayment", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders subtotal", () => {
    const cartStore = useCartStore();
    cartStore.cart.items = [cartItemFixture];
    const wrapper = shallowMount(CartPayment, {});
    expect(wrapper.find('[data-test="cart-subtotal"]').text()).toContain(
      "$1200"
    );
  });
  it("renders shipping as free", () => {
    const wrapper = shallowMount(CartPayment);
    expect(wrapper.find('[data-test="cart-shipping"]').text()).toContain(
      "Free"
    );
  });
  it("renders total", () => {
    const cartStore = useCartStore();
    cartStore.cart.items = [cartItemFixture];
    const wrapper = shallowMount(CartPayment);

    expect(wrapper.find('[data-test="cart-total"]').text()).toContain("$1200");
  });
  it("renders rounded total from store", () => {
    const cartStore = useCartStore();
    cartStore.cart.items = [cartItemFixture];
    const wrapper = shallowMount(CartPayment);

    expect(wrapper.find('[data-test="cart-total"]').text()).toContain("$1200");
  });
});

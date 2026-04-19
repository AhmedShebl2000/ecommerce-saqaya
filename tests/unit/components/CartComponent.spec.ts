import CartComponent from "@/modules/cart/components/CartComponent.vue";
import CartItem from "@/modules/cart/components/CartItem.vue";
import CartPayment from "@/modules/cart/components/CartPayment.vue";
import { useCartStore } from "@/modules/cart/store/cart";
import BaseButton from "@/modules/shared/components/BaseButton.vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

const mountOptions = {
  global: {
    stubs: {
      CartItem: true,
      CartPayment: true,
      BaseButton: true,
      "base-button": true,
    },
  },
};

const cartItemFixture = {
  product: { id: 1, thumbnail: "img.png", title: "Item 1", price: 50 } as any,
  qty: 1,
};

describe("CartComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders title", () => {
    const wrapper = shallowMount(CartComponent, mountOptions);
    expect(wrapper.find('[data-test="cart-title"]').text()).toContain(
      "Shopping Cart"
    );
  });
  it("renders empty cart", () => {
    const wrapper = shallowMount(CartComponent, mountOptions);
    expect(wrapper.find('[data-test="cart-empty"]').text()).toContain(
      "You currently have no items in cart"
    );
  });
  it("renders cart with items", () => {
    const cartStore = useCartStore();
    cartStore.cart.items = [cartItemFixture];

    const wrapper = shallowMount(CartComponent, mountOptions);
    expect(wrapper.findComponent({ name: "CartItem" }).exists()).toBe(true);
  });

  it("close cart when button is clicked", async () => {
    const cartStore = useCartStore();
    cartStore.isOpen = true;

    const wrapper = shallowMount(CartComponent, mountOptions);
    await wrapper.find('[data-test="cart-close"]').trigger("click");
    expect(cartStore.isOpen).toBe(false);
  });

  it("toggles cart when cart icon is clicked", async () => {
    const cartStore = useCartStore();
    cartStore.isOpen = false;

    const wrapper = shallowMount(CartComponent, mountOptions);
    await wrapper.find('[data-test="cart-icon"]').trigger("click");
    expect(cartStore.isOpen).toBe(true);
  });
  it("clears cart when cart clear cart is clicked", async () => {
    const cartStore = useCartStore();
    cartStore.cart.items = [cartItemFixture];

    const wrapper = shallowMount(CartComponent, {
      stubs: {
        CartItem: true,
        CartPayment: true,
        BaseButton: {
          template: "<button @click=\"$emit('click')\"><slot /></button>",
        },
      },
    });
    await wrapper.find('[data-test="clear-cart"]').trigger("click");
    expect(cartStore.cart.items).toHaveLength(0);
  });
  it("does not render cart payment when cart is empty", () => {
    const wrapper = shallowMount(CartComponent, mountOptions);
    expect(wrapper.findComponent({ name: "CartPayment" }).exists()).toBe(false);
  });
  it("renders cart payment when cart has items", () => {
    const cartStore = useCartStore();
    cartStore.cart.items = [cartItemFixture];

    const wrapper = shallowMount(CartComponent, mountOptions);

    expect(wrapper.findComponent({ name: "CartPayment" }).exists()).toBe(true);
  });
});

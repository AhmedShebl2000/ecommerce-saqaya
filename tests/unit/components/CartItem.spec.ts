import CartItem from "@/modules/cart/components/CartItem.vue";
import { useCartStore } from "@/modules/cart/store/cart";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

const makeItem = (qty = 1) => ({
  product: {
    id: 1,
    title: "Item 1",
    thumbnail: "image.png",
    price: 50,
  } as any,
  qty,
});

const setupStore = (items = [makeItem()]) => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const cartStore = useCartStore();
  cartStore.cart.items = items;
  return cartStore;
};

const createWrapper = () =>
  shallowMount(CartItem, {
    props: {
      id: 1,
      title: "Item 1",
      thumbnail: "image.png",
      price: 50,
    },
  });

describe("CartItem", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders title", () => {
    setupStore();
    const wrapper = createWrapper();
    expect(wrapper.find('[data-test="cart-item-title"]').text()).toContain(
      "Item 1"
    );
  });

  it("renders quantity from store", () => {
    setupStore();
    const wrapper = createWrapper();
    expect(
      (wrapper.find('[data-test="cart-item-qty"]').element as HTMLInputElement)
        .value
    ).toBe("1");
  });

  it("renders rounded price based on quantity", () => {
    setupStore();
    const wrapper = createWrapper();
    expect(wrapper.find('[data-test="cart-item-price"]').text()).toContain(
      "$50"
    );
  });

  it("calls addToCart when increase button is clicked", async () => {
    const cartStore = setupStore();
    const wrapper = createWrapper();
    await wrapper.find('[data-test="cart-item-increase"]').trigger("click");
    expect(cartStore.cart.items[0].qty).toBe(2);
  });

  it("commits decreaseQuantity when decrease button is clicked", async () => {
    const cartStore = setupStore([
      {
        product: {
          id: 1,
          title: "Item 1",
          thumbnail: "image.png",
          price: 50,
        } as any,
        qty: 2,
      },
    ]);
    const wrapper = createWrapper();
    await wrapper.find('[data-test="cart-item-decrease"]').trigger("click");
    expect(cartStore.cart.items[0].qty).toBe(1);
  });

  it("commits removeFromCart when remove button is clicked", async () => {
    const cartStore = setupStore();
    const wrapper = createWrapper();
    await wrapper.find('[data-test="cart-item-remove"]').trigger("click");
    expect(cartStore.cart.items).toHaveLength(0);
  });
  it("returns quantity from store when item exists", () => {
    setupStore();
    const wrapper = createWrapper();
    const vm = wrapper.vm as any;

    expect(vm.itemQty).toBe(1);
  });

  it("returns fallback quantity when item is missing", () => {
    setupStore([]);

    const wrapper = shallowMount(CartItem, {
      props: {
        id: 999,
        title: "Missing Item",
        thumbnail: "image.png",
        price: 50,
      },
    });

    const vm = wrapper.vm as any;

    expect(vm.itemQty).toBe(1);
  });
});

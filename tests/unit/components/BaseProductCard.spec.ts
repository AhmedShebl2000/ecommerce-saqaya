import BaseProductCard from "@/modules/shared/components/BaseProductCard.vue";
import { shallowMount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

const defaultProps = {
  id: 1,
  title: "Airpods",
  image: "test.jpg",
  price: 50,
  rating: 4,
  ratingCount: 10,
};

describe("BaseProductCard", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders title", () => {
    const wrapper = shallowMount(BaseProductCard, {
      props: defaultProps,
    });
    expect(wrapper.find('[data-test="product-card"]').text()).toContain(
      "Airpods"
    );
  });
  it("renders price", () => {
    const wrapper = shallowMount(BaseProductCard, {
      props: defaultProps,
    });
    expect(wrapper.find('[data-test="product-price"]').text()).toContain("$50");
  });
  it("shows discount badge when discount exists", () => {
    const wrapper = shallowMount(BaseProductCard, {
      props: { ...defaultProps, discountPercentage: 20 },
    });
    expect(wrapper.find('[data-test="product-discount"]').text()).toContain(
      "-20%"
    );
  });
  it("does not show discount badge when discount is 0", () => {
    const wrapper = shallowMount(BaseProductCard, {
      props: { ...defaultProps, discountPercentage: 0 },
    });
    expect(wrapper.find('[data-test="product-discount"]').exists()).toBe(false);
  });
  it("emits click when card is clicked", async () => {
    const wrapper = shallowMount(BaseProductCard, {
      props: { ...defaultProps, discountPercentage: 20 },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});

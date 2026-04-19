import SortDropdown from "@/modules/products/components/SortDropdown.vue";
import { shallowMount } from "@vue/test-utils";

describe("SortDropdown", () => {
  it("renders select element", () => {
    const wrapper = shallowMount(SortDropdown);

    expect(wrapper.find('[data-test="select-element"]').exists()).toBe(true);
  });
  it("renders all select sort options", () => {
    const wrapper = shallowMount(SortDropdown);

    expect(wrapper.findAll('[data-test="select-option"]').length).toBe(6);
  });
  it("emits event on selection change", async () => {
    const wrapper = shallowMount(SortDropdown, {
      props: {
        sortBy: "Highest Rating",
      },
    });
    const select = wrapper.find('[data-test="select-element"]');
    await select.setValue("High to low");

    expect(wrapper.emitted()).toHaveProperty("handleFetchSortedProducts");
  });
  it("emits correct value on selection change", async () => {
    const wrapper = shallowMount(SortDropdown, {
      props: {
        sortBy: "Highest Rating",
      },
    });
    const select = wrapper.find('[data-test="select-element"]');
    await select.setValue("category");

    const emitted = wrapper.emitted().handleFetchSortedProducts;
    expect(emitted).toBeTruthy;
    expect(emitted?.[0]).toEqual(["category"]);
  });
});

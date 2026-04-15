import BaseLoader from "@/modules/shared/components/BaseLoader.vue";
import { shallowMount } from "@vue/test-utils";

describe("BaseSpinner", () => {
  it("renders spinner container", () => {
    const wrapper = shallowMount(BaseLoader);
    expect(wrapper.find('[data-test="spinner-container"]').exists()).toBe(true);
  });
  it("renders the spinner circle", () => {
    const wrapper = shallowMount(BaseLoader);
    expect(wrapper.find('[data-test="spinner-circle"]').exists()).toBe(true);
  });
  it("uses the default size when no prop is passed", () => {
    const wrapper = shallowMount(BaseLoader);
    const spinner = wrapper.find('[data-test="spinner-container"]');

    const el = spinner.element as HTMLElement;

    expect(el.style.width).toBe("40px");
  });
});

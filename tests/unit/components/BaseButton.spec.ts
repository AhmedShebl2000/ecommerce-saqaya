import BaseButton from "@/modules/shared/components/BaseButton.vue";
import { shallowMount } from "@vue/test-utils";

const globalStubs = {
  global: {
    stubs: {
      RouterLink: true,
    },
  },
};

describe("BaseButton", () => {
  it("renders a button when link is false", () => {
    const wrapper = shallowMount(BaseButton, {
      ...globalStubs,
      slots: { default: "Click me" },
    });
    expect(wrapper.find('[data-test="button"]').exists()).toBe(true);
    expect(wrapper.text()).toContain("Click me");
  });

  it("emits click when button is clicked", async () => {
    const wrapper = shallowMount(BaseButton, globalStubs);
    await wrapper.find('[data-test="button"]').trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("renders disabled button when disabled is true", () => {
    const wrapper = shallowMount(BaseButton, {
      ...globalStubs,
      props: { disabled: true },
    });
    expect(
      wrapper.find('[data-test="button"]').attributes("disabled")
    ).toBeDefined();
  });

  it("renders a router-link when link is true", () => {
    const wrapper = shallowMount(BaseButton, {
      props: { link: true, to: "/products" },
      slots: { default: "Go to products" },
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });
    expect(wrapper.find("a").exists()).toBe(true);
    expect(wrapper.find('[data-test="button"]').exists()).toBe(false);
    expect(wrapper.text()).toContain("Go to products");
  });
});

import BaseButton from "@/modules/shared/components/BaseButton.vue";
import { shallowMount } from "@vue/test-utils";

describe("BaseButton", () => {
  it("renders a button when link is false", () => {
    const wrapper = shallowMount(BaseButton, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.find('[data-test="button"]').exists()).toBe(true);
    expect(wrapper.findComponent({ name: "RouterLinkStub" }).exists()).toBe(
      false
    );
    expect(wrapper.text()).toContain("Click me");
  });

  it("emits click when button is clicked", async () => {
    const wrapper = shallowMount(BaseButton);

    await wrapper.find('[data-test="button"]').trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("renders disabled button when disabled is true", () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.find('[data-test="button"]').attributes("disabled")).toBe(
      "disabled"
    );
  });

  it("renders a router-link when link is true", () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        link: true,
        to: "/products",
      },
      slots: {
        default: "Go to products",
      },
      stubs: {
        "router-link": true,
      },
    });

    const link = wrapper.find("router-link-stub");

    expect(link.exists()).toBe(true);
    expect(link.attributes("to")).toBe("/products");
    expect(wrapper.find('[data-test="button"]').exists()).toBe(false);
    expect(wrapper.text()).toContain("Go to products");
  });
});

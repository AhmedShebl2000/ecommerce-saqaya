import BaseButton from "@/modules/shared/components/BaseButton.vue";
import BaseError from "@/modules/shared/components/BaseError.vue";
import { shallowMount } from "@vue/test-utils";

const mountOptions = {
  global: {
    stubs: {
      BaseButton: true,
      "base-button": true,
    },
  },
};

describe("BaseError", () => {
  it("renders error message", () => {
    const wrapper = shallowMount(BaseError, {
      props: {
        message: "Something went wrong.",
      },
      ...mountOptions,
    });
    expect(wrapper.find('[data-test="error_message"]').text()).toContain(
      "Something went wrong."
    );
  });
  it("renders default error message when none is provided", () => {
    const wrapper = shallowMount(BaseError, mountOptions);
    expect(wrapper.find('[data-test="error_message"]').text()).toContain(
      "Something went wrong. Please try again."
    );
  });
  it("shows the retry button when retryable is true", () => {
    const wrapper = shallowMount(BaseError, mountOptions);
    expect(wrapper.find('[data-test="retry-button"]').exists()).toBe(true);
  });
  it("hides the retry button when retryable is false", () => {
    const wrapper = shallowMount(BaseError, {
      props: {
        retryable: false,
      },
      ...mountOptions,
    });
    expect(wrapper.find('[data-test="retry-button"]').exists()).toBe(false);
  });
  it("emits retry when the button is clicked", async () => {
    const wrapper = shallowMount(BaseError, {
      props: {
        retryable: true,
      },
      global: {
        stubs: {
          BaseButton: {
            name: "BaseButton",
            template:
              '<button data-test="retry-button" @click="$emit(\'click\')"><slot /></button>',
          },
        },
      },
    });
    await wrapper.find('[data-test="retry-button"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("retry");
  });
});

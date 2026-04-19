import BaseRatingComponent from "@/modules/shared/components/BaseRatingComponent.vue";
import { shallowMount } from "@vue/test-utils";

describe("BaseRatingComponent", () => {
  it("renders 5 stars", () => {
    const wrapper = shallowMount(BaseRatingComponent, {
      props: {
        rating: 4,
      },
    });

    expect(wrapper.findAll('[data-test="star-item"]').length).toBe(5);
  });

  it("shows rating count when ratingCount is provided", () => {
    const wrapper = shallowMount(BaseRatingComponent, {
      props: {
        rating: 4,
        ratingCount: 25,
      },
    });

    expect(wrapper.find('[data-test="count-rating"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="count-rating"]').text()).toBe("(25)");
  });

  it("does not show rating count when ratingCount is 0", () => {
    const wrapper = shallowMount(BaseRatingComponent, {
      props: {
        rating: 4,
        ratingCount: 0,
      },
    });

    expect(wrapper.find('[data-test="count-rating"]').exists()).toBe(false);
  });

  it("returns 100 for a fully filled star", () => {
    const wrapper = shallowMount(BaseRatingComponent, {
      props: {
        rating: 4,
      },
    });

    expect((wrapper.vm as any).getFill(1)).toBe(100);
  });

  it("returns partial fill for a partially filled star", () => {
    const wrapper = shallowMount(BaseRatingComponent, {
      props: {
        rating: 3.5,
      },
    });

    expect((wrapper.vm as any).getFill(4)).toBe(50);
  });

  it("returns 0 for an empty star", () => {
    const wrapper = shallowMount(BaseRatingComponent, {
      props: {
        rating: 2,
      },
    });

    expect((wrapper.vm as any).getFill(4)).toBe(0);
  });
});

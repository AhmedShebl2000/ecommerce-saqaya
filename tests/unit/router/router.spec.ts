//mocks to not import the real files
jest.mock("@/modules/products/views/ProductDetailsPage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/views/ContactPage.vue", () => ({ render: (h: any) => h("div") }));
jest.mock("@/views/NotFoundPage.vue", () => ({ render: (h: any) => h("div") }));
jest.mock("@/modules/shared/layout/DefaultLayout.vue", () => ({
  //route view because it includes children
  render: (h: any) => h("router-view"),
}));
jest.mock("@/modules/shared/layout/EmptyLayout.vue", () => ({
  render: (h: any) => h("router-view"),
}));
jest.mock("@/views/AboutPage.vue", () => ({ render: (h: any) => h("div") }));
jest.mock("@/modules/home/views/HomePage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/modules/products/views/ProductsPage.vue", () => ({
  render: (h: any) => h("div"),
}));

import router from "@/router/index";
import Vue from "vue";

describe("Router", () => {
  //reset route to '/'
  afterEach(async () => {
    if (router.currentRoute.path !== "/") {
      await router.push("/");
      await Vue.nextTick(); //need tp finish for updating
    }
  });

  it("navigates to home on /", async () => {
    await router.push("/");
    await Vue.nextTick();
    expect(router.currentRoute.name).toBe("home");
  });

  it("navigates to products on /products", async () => {
    await router.push("/products");
    await Vue.nextTick();
    expect(router.currentRoute.name).toBe("products");
  });

  it("navigates to product detail on /products/:productSlug", async () => {
    await router.push("/products/test-product");
    expect(router.currentRoute.name).toBe("product");
    expect(router.currentRoute.params.productSlug).toBe("test-product");
  });

  it("navigates to about on /about", async () => {
    await router.push("/about");
    expect(router.currentRoute.name).toBe("about");
  });

  it("navigates to contact on /contact", async () => {
    await router.push("/contact");
    expect(router.currentRoute.name).toBe("contact");
  });

  it("navigates to notFound on unknown path", async () => {
    await router.push("/this-does-not-exist");
    expect(router.currentRoute.name).toBe("notFound");
  });
});

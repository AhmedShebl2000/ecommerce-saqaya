//mocks to not import the real files
jest.mock("@/modules/products/views/ProductDetailsPage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/modules/shared/views/ContactPage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/modules/shared/views/NotFoundPage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/modules/shared/layout/DefaultLayout.vue", () => ({
  //route view because it includes children
  render: (h: any) => h("router-view"),
}));
jest.mock("@/modules/shared/layout/EmptyLayout.vue", () => ({
  render: (h: any) => h("router-view"),
}));
jest.mock("@/modules/shared/views/AboutPage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/modules/home/views/HomePage.vue", () => ({
  render: (h: any) => h("div"),
}));
jest.mock("@/modules/products/views/ProductsPage.vue", () => ({
  render: (h: any) => h("div"),
}));

import router from "@/router/index";
import { createPinia, setActivePinia } from "pinia";

describe("Router", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("navigates to home on /", async () => {
    await router.push("/");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("home");
  });

  it("navigates to products on /products", async () => {
    await router.push("/products");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("products");
  });

  it("navigates to product detail on /products/:productSlug", async () => {
    await router.push("/products/test-product");
    await router.isReady();

    expect(router.currentRoute.value.name).toBe("product");
  });

  it("navigates to about on /about", async () => {
    await router.push("/about");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("about");
  });

  it("navigates to contact on /contact", async () => {
    await router.push("/contact");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("contact");
  });

  it("navigates to notFound on unknown path", async () => {
    await router.push("/this-does-not-exist");
    await router.isReady();
    expect(router.currentRoute.value.name).toBe("notFound");
  });
});

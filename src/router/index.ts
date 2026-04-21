import DefaultLayout from "@/modules/shared/layout/DefaultLayout.vue";
import EmptyLayout from "@/modules/shared/layout/EmptyLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/modules/home/views/HomePage.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("@/modules/products/views/ProductsPage.vue"),
      },
      {
        path: "products/:productId/:productSlug?",
        name: "product",
        component: () =>
          import("@/modules/products/views/ProductDetailsPage.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/modules/shared/views/AboutPage.vue"),
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("@/modules/shared/views/ContactPage.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: EmptyLayout,
        children: [
          {
            path: "",
            name: "notFound",
            component: () => import("@/modules/shared/views/NotFoundPage.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

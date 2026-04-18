import ProductDetailsPage from "@/modules/products/views/ProductDetailsPage.vue";
import DefaultLayout from "@/modules/shared/layout/DefaultLayout.vue";
import EmptyLayout from "@/modules/shared/layout/EmptyLayout.vue";
import HomePage from "@/modules/home/views/HomePage.vue";
import ProductsPage from "@/modules/products/views/ProductsPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import AboutPage from "@/pages/AboutPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomePage,
      },
      {
        path: "products",
        name: "products",
        component: ProductsPage,
      },
      {
        path: "products/:productId/:productSlug?",
        name: "product",
        component: ProductDetailsPage,
      },
      { path: "about", name: "about", component: AboutPage },
      { path: "contact", name: "contact", component: ContactPage },
      {
        path: "/:pathMatch(.*)*",
        component: EmptyLayout,
        children: [
          {
            path: "",
            name: "notFound",
            component: NotFoundPage,
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

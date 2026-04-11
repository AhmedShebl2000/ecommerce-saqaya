import Vue from "vue";
import VueRouter from "vue-router";

import ProductDetailsPage from "@/modules/products/views/ProductDetailsPage.vue";
import ContactPage from "@/modules/home/views/ContactPage.vue";
import NotFoundPage from "@/modules/home/views/NotFoundPage.vue";
import DefaultLayout from "@/modules/shared/layout/DefaultLayout.vue";
import EmptyLayout from "@/modules/shared/layout/EmptyLayout.vue";
import AboutPage from "@/modules/home/views/AboutPage.vue";
import HomePage from "@/modules/home/views/HomePage.vue";
import ProductsPage from "@/modules/products/views/ProductsPage.vue";

Vue.use(VueRouter);

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
        path: "products/:productSlug",
        name: "product",
        component: ProductDetailsPage,
      },
      { path: "about", name: "about", component: AboutPage },
      { path: "contact", name: "contact", component: ContactPage },
      {
        path: "*",
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

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

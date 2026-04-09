import Vue from "vue";
import VueRouter from "vue-router";

import ProductDetailsPage from "@/pages/ProductDetailsPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import DefaultLayout from "@/Layouts/DefaultLayout.vue";
import EmptyLayout from "@/Layouts/EmptyLayout.vue";
import AboutPage from "@/pages/AboutPage.vue";
import HomePage from "@/pages/HomePage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";

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
    ],
  },
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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

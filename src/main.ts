import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import BaseArrow from "./modules/shared/components/BaseArrow.vue";
import BaseProductCard from "./modules/shared/components/BaseProductCard.vue";
import BaseRatingComponent from "./modules/shared/components/BaseRatingComponent.vue";
import BaseButton from "./modules/shared/components/BaseButton.vue";
import BaseHeader from "./modules/shared/components/BaseHeader.vue";

Vue.config.productionTip = false;

Vue.component("base-arrow", BaseArrow);
Vue.component("base-product-card", BaseProductCard);
Vue.component("base-rating-component", BaseRatingComponent);
Vue.component("base-button", BaseButton);
Vue.component("base-header", BaseHeader);

Vue.use(Toast, {
  position: "top-right",
  timeout: 3000,
});

new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");

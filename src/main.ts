import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import BaseArrow from "./components/UI/BaseArrow.vue";
import BaseProductCard from "./components/UI/BaseProductCard.vue";
import BaseRatingComponent from "./components/UI/BaseRatingComponent.vue";
import BaseButton from "./components/UI/BaseButton.vue";

Vue.config.productionTip = false;

Vue.component("base-arrow", BaseArrow);
Vue.component("base-product-card", BaseProductCard);
Vue.component("base-rating-component", BaseRatingComponent);
Vue.component("base-button", BaseButton);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

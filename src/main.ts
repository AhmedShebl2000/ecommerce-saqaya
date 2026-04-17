import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import "./assets/styles/main.scss";

import BaseArrow from "./modules/shared/components/BaseArrow.vue";
import BaseProductCard from "./modules/shared/components/BaseProductCard.vue";
import BaseRatingComponent from "./modules/shared/components/BaseRatingComponent.vue";
import BaseButton from "./modules/shared/components/BaseButton.vue";
import BaseHeader from "./modules/shared/components/BaseHeader.vue";
import BaseSalesCard from "./modules/shared/components/BaseSalesCard.vue";
import BaseTeamCarousel from "./modules/shared/components/BaseTeamCarousel.vue";
import BaseServiceFeatures from "./modules/shared/components/BaseServiceFeatures.vue";
import BaseLoader from "./modules/shared/components/BaseLoader.vue";
import BaseError from "./modules/shared/components/BaseError.vue";
import BaseBreadCrumb from "./modules/shared/components/BaseBreadCrumb.vue";

// Vue.config.productionTip = false;

const pinia = createPinia();
const app = createApp(App);

app.component("base-arrow", BaseArrow);
app.component("base-product-card", BaseProductCard);
app.component("base-rating-component", BaseRatingComponent);
app.component("base-button", BaseButton);
app.component("base-header", BaseHeader);
app.component("base-sales-card", BaseSalesCard);
app.component("base-team-carousel", BaseTeamCarousel);
app.component("base-service-features", BaseServiceFeatures);
app.component("base-loader", BaseLoader);
app.component("base-error", BaseError);
app.component("base-bread-crumb", BaseBreadCrumb);

app.use(pinia);
app.use(router);
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
});

app.mount("#app");

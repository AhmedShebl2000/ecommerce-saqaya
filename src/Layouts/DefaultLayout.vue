<template>
  <div>
    <header-component></header-component>
    <div class="default-layout__content">
      <router-view></router-view>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderComponent from "@/components/UI/HeaderComponent.vue";
import FooterComponent from "@/components/UI/FooterComponent.vue";

export default {
  components: { HeaderComponent, FooterComponent },
};
</script>

<style scoped>
.default-layout__content {
  max-width: 1440px;
  margin-inline: auto;
  margin-top: 66px;
  min-height: calc(100vh - 147px);
}

@media (max-width: 1440px) {
  .default-layout__content {
    padding: 0 20px;
  }
}
</style>

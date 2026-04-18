<template>
  <div>
    <header-component></header-component>
    <div class="default-layout__content">
      <router-view></router-view>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script setup>
import HeaderComponent from "./HeaderComponent.vue";
import FooterComponent from "./FooterComponent.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/styles/layout/default-layout";
</style>

<template>
  <div class="service-features">
    <div
      v-for="feature in features"
      :key="feature.id"
      class="service-features__item"
    >
      <div class="service-features__icon-outer">
        <div class="service-features__icon-inner">
          <component :is="feature.icon" />
        </div>
      </div>

      <h3 class="service-features__title">{{ feature.title }}</h3>
      <p class="service-features__subtitle">{{ feature.subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/service-features";
</style>

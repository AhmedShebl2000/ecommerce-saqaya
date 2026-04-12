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

<script>
export default {
  name: "BaseServiceFeatures",
  props: {
    features: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.service-features {
  display: flex;
  justify-content: center;
  gap: 88px;
  flex-wrap: wrap;
}

.service-features__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 250px;
}

.service-features__icon-outer {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #cfcfcf;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.service-features__icon-inner {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.service-features__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
}

.service-features__subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 1024px) {
  .service-features {
    gap: 48px;
  }
}

@media (max-width: 768px) {
  .service-features {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .service-features__item {
    max-width: 300px;
  }
}
</style>

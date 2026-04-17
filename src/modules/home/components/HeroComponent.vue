<template>
  <section class="hero-carousel">
    <div class="hero-carousel__slide" @click="$router.push('/products')">
      <img
        class="hero-carousel__image"
        :src="slides[currentSlide]"
        alt="Hero banner"
      />
    </div>

    <div class="hero-carousel__dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        type="button"
        class="hero-carousel__dot"
        :class="{ 'hero-carousel__dot--active': index === currentSlide }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      intervalId: null,
      slides: [
        "/Hero1.png",
        "/hero2.jpg",
        "/hero3.jpg",
        "/hero4.png",
        "/hero5.jpg",
      ],
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    goToSlide(index) {
      this.currentSlide = index;
    },
    startAutoSlide() {
      this.intervalId = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/hero";
</style>

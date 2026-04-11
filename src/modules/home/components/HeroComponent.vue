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
        "/Hero1.png",
        "/Hero1.png",
        "/Hero1.png",
        "/Hero1.png",
      ],
    };
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
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

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background: black;
  margin-bottom: 100px;
}

.hero-carousel__slide {
  cursor: pointer;
}

.hero-carousel__image {
  display: block;
  width: 100%;
  height: auto;
}

.hero-carousel__dots {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-carousel__dot {
  all: unset;
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #808080;
  cursor: pointer;
  flex-shrink: 0;
}

.hero-carousel__dot--active {
  background: #db4444;
  box-shadow: 0 0 0 2px white;
}
</style>

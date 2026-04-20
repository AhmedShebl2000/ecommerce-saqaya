<template>
  <section class="hero-carousel">
    <div class="hero-carousel__slide" @click="router.push('/products')">
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

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  startAutoSlide();
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});

const currentSlide = ref(0);
const intervalId = ref(null);
const slides = ref([
  "/Hero1.png",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg",
]);

function goToSlide(index) {
  currentSlide.value = index;
}

function startAutoSlide() {
  intervalId.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }, 3000);
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/hero";
</style>

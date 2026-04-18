<template>
  <div class="team-carousel">
    <div class="team-carousel__track-wrapper">
      <div class="team-carousel__track" :style="trackStyle">
        <div
          v-for="member in members"
          :key="member.id"
          class="team-carousel__slide"
        >
          <div class="team-carousel__image-box">
            <img
              class="team-carousel__image"
              :src="member.image"
              :alt="member.name"
            />
          </div>

          <h3 class="team-carousel__name">{{ member.name }}</h3>
          <p class="team-carousel__role">{{ member.role }}</p>

          <div class="team-carousel__socials">
            <a
              v-if="member.twitter"
              :href="member.twitter"
              rel="noopener noreferrer"
              class="team-carousel__social-link"
              aria-label="Twitter"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 5.8C21.3 6.1 20.6 6.3 19.8 6.4C20.6 5.9 21.2 5.2 21.5 4.3C20.8 4.8 19.9 5.1 19 5.3C18.3 4.6 17.3 4.2 16.2 4.2C14.1 4.2 12.4 5.9 12.4 8C12.4 8.3 12.4 8.6 12.5 8.8C9.4 8.7 6.7 7.2 4.8 4.9C4.5 5.4 4.3 6 4.3 6.7C4.3 8 5 9.1 6 9.8C5.4 9.8 4.9 9.6 4.4 9.4V9.5C4.4 11.3 5.7 12.8 7.4 13.1C7.1 13.2 6.7 13.2 6.4 13.2C6.2 13.2 6 13.2 5.8 13.1C6.2 14.6 7.5 15.7 9.1 15.7C7.8 16.8 6.1 17.4 4.3 17.4C4 17.4 3.7 17.4 3.4 17.3C5 18.3 6.9 18.9 9 18.9C16.2 18.9 20.2 12.9 20.2 7.7V7.2C21 6.8 21.6 6.4 22 5.8Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              v-if="member.instagram"
              :href="member.instagram"
              rel="noopener noreferrer"
              class="team-carousel__social-link"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 3H7.5C5 3 3 5 3 7.5V16.5C3 19 5 21 7.5 21H16.5C19 21 21 19 21 16.5V7.5C21 5 19 3 16.5 3ZM19.5 16.5C19.5 18.2 18.2 19.5 16.5 19.5H7.5C5.8 19.5 4.5 18.2 4.5 16.5V7.5C4.5 5.8 5.8 4.5 7.5 4.5H16.5C18.2 4.5 19.5 5.8 19.5 7.5V16.5ZM12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7ZM12 15.5C10 15.5 8.5 14 8.5 12C8.5 10 10 8.5 12 8.5C14 8.5 15.5 10 15.5 12C15.5 14 14 15.5 12 15.5ZM17.5 6.8C17.5 7.2 17.2 7.5 16.8 7.5C16.4 7.5 16.1 7.2 16.1 6.8C16.1 6.4 16.4 6.1 16.8 6.1C17.2 6.1 17.5 6.4 17.5 6.8Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a
              v-if="member.linkedin"
              :href="member.linkedin"
              rel="noopener noreferrer"
              class="team-carousel__social-link"
              aria-label="LinkedIn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.94 8.5C7.77 8.5 8.44 7.83 8.44 7C8.44 6.17 7.77 5.5 6.94 5.5C6.11 5.5 5.44 6.17 5.44 7C5.44 7.83 6.11 8.5 6.94 8.5ZM5.7 9.7H8.2V18.5H5.7V9.7ZM12.1 9.7H14.5V10.9H14.6C14.9 10.3 15.8 9.5 17.1 9.5C19.7 9.5 20.2 11.2 20.2 13.4V18.5H17.7V14C17.7 12.9 17.7 11.5 16.2 11.5C14.7 11.5 14.5 12.7 14.5 13.9V18.5H12.1V9.7Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="team-carousel__dots">
      <button
        v-for="page in pageCount"
        :key="page"
        type="button"
        class="team-carousel__dot"
        :class="{ 'team-carousel__dot--active': currentPage === page - 1 }"
        @click="goToPage(page - 1)"
        :aria-label="`Go to slide group ${page}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  members: {
    type: Array,
    default: () => [],
  },
});

onMounted(() => {
  updateCardsPerPage();
  window.addEventListener("resize", updateCardsPerPage);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCardsPerPage);
});

const currentPage = ref(0);
const cardsPerPage = ref(3);

const pageCount = computed(() => {
  return Math.ceil(props.members?.length / cardsPerPage.value) || 1;
});

const trackStyle = computed(() => {
  return {
    transform: `translateX(-${currentPage.value * 100}%)`,
  };
});

function goToPage(page) {
  currentPage.value = page;
}

function updateCardsPerPage() {
  if (window.innerWidth <= 768) {
    cardsPerPage.value = 1;
  } else if (window.innerWidth <= 1024) {
    cardsPerPage.value = 2;
  } else {
    cardsPerPage.value = 3;
  }

  if (currentPage.value > pageCount.value - 1) {
    currentPage.value = pageCount.value - 1;
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/team-carousel";
</style>

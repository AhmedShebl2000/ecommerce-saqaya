<template>
  <div>
    <base-bread-crumb :items="breadcrumbItems"></base-bread-crumb>
    <div class="not-found">
      <h1 class="not-found__title">404 Not Found</h1>
      <p class="not-found__text">
        Your visited page was not found. You may go to home page.
      </p>
      <div class="not-found__button">
        <base-button link to="/">Back top home page</base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbItems() {
      return [
        { id: 1, label: "Home", to: "/" },
        {
          id: 2,
          label: "404 Error",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/pages/not-found";
</style>

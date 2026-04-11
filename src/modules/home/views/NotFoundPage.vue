<template>
  <div class="not-found">
    <h1 class="not-found--main-text">404 Not Found</h1>
    <p class="not-found--secondary-text">
      Your visited page was not found. You may go to home page.
    </p>
    <base-button link to="/">Back top home page</base-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  height: 70vh;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

.not-found--main-text {
  font-weight: 500;
  letter-spacing: 3%;
  font-size: 110px;
}

.not-found--secondary-text {
  font-size: 16px;
}
</style>

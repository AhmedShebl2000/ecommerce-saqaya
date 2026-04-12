<template>
  <div class="not-found">
    <h1 class="not-found__title">404 Not Found</h1>
    <p class="not-found__text">
      Your visited page was not found. You may go to home page.
    </p>
    <div class="not-found__button">
      <base-button link to="/">Back top home page</base-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  gap: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px 16px;
}

.not-found__title {
  font-weight: 500;
  letter-spacing: 3%;
  font-size: 110px;
  margin: 0;
}

.not-found__text {
  font-size: 16px;
  margin: 0;
  max-width: 500px;
}

.not-found__button {
  display: flex;
  justify-content: center;
}

/* MEDIA QUERIES */
@media (max-width: 992px) {
  .not-found__title {
    font-size: 80px;
  }
}

@media (max-width: 768px) {
  .not-found {
    min-height: 60vh;
    gap: 20px;
  }

  .not-found__title {
    font-size: 56px;
  }

  .not-found__text {
    font-size: 15px;
    max-width: 320px;
  }
}

@media (max-width: 480px) {
  .not-found__title {
    font-size: 42px;
  }

  .not-found__text {
    font-size: 14px;
    max-width: 280px;
  }
}
</style>

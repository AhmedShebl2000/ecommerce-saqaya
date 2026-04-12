<template>
  <div class="card" :class="{ 'card--different-background': targetId === id }">
    <div>
      <slot></slot>
    </div>
    <p class="card__amount">{{ amount }}k</p>
    <p class="card__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  props: ["id", "amount", "subtitle"],
  data() {
    return {
      targetId: 2,
    };
  },
};
</script>

<style scoped>
.card {
  width: 338px;
  height: 230px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.card__amount {
  font-weight: 700;
  font-size: 32px;
  letter-spacing: 4%;
}

.card__subtitle {
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0%;
}

.card--different-background {
  background-color: #db4444;
  color: white;
}
</style>

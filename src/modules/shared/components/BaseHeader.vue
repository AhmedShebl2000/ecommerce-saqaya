<template>
  <div class="base-header">
    <div class="base-header__box"></div>
    <p><slot></slot></p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.base-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #db4444;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
}

.base-header__box {
  background: #db4444;
  width: 20px;
  height: 40px;
  border-radius: 4px;
}
</style>

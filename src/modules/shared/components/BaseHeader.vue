<template>
  <div class="base-header">
    <div class="base-header__box"></div>
    <p><slot></slot></p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@/assets/styles/abstracts/variables" as *;

.base-header {
  display: flex;
  align-items: center;
  gap: 10px;
  color: $color-primary;
  margin-bottom: 20px;
  font-size: $font-size-md;
  font-weight: 600;

  &__box {
    background: $color-primary;
    width: 20px;
    height: 40px;
    border-radius: $border-radius-base;
  }
}
</style>

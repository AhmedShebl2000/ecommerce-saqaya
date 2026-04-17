<template>
  <div class="breadcrumb" aria-label="Breadcrumb">
    <ul class="breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="breadcrumb__item"
      >
        <router-link
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="breadcrumb__link"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="breadcrumb__current">{{ item.label }}</span>
        <span v-if="index !== items.length - 1" class="breadcrumb__separator">
          /
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/components/breadcrumb";
</style>

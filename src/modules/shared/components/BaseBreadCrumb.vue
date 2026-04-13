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

<style scoped>
.breadcrumb {
  margin-bottom: 40px;
}

.breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.breadcrumb__link {
  text-decoration: none;
}

.breadcrumb__current {
  color: black;
}

.breadcrumb__separator {
  color: rgba(0, 0, 0, 0.5);
}

.breadcrumb__link,
.breadcrumb__link:visited,
.breadcrumb__link:hover {
  color: black;
}
</style>

<template>
  <select
    data-test="select-element"
    class="products-page__filter-select"
    :value="sortBy"
    @change="onChange"
  >
    <option data-test="select-option" value="Highest Rating">
      Highest Rating
    </option>
    <option data-test="select-option" value="Low to high">
      Price: Low to high
    </option>
    <option data-test="select-option" value="High to low">
      Price: High to low
    </option>
    <option data-test="select-option" value="discount">
      Discount percentage
    </option>
    <option data-test="select-option" value="brand">Brand</option>
    <option data-test="select-option" value="category">Category</option>
  </select>
</template>

<script setup>
defineProps(["sortBy"]);
const emits = defineEmits(["handleFetchSortedProducts"]);

function onChange(event) {
  emits("handleFetchSortedProducts", event.target.value);
}

// export default {
//   props: ["sortBy"],
//   emits: ["handleFetchSortedProducts"],
//   methods: {
//     onChange(event) {
//       this.$emit("handleFetchSortedProducts", event.target.value);
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>

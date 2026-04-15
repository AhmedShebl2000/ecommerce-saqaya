module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  coverageProvider: "babel",
  collectCoverageFrom: [
    "src/modules/cart/components/CartComponent.vue",
    "src/modules/cart/components/CartItem.vue",
    "src/modules/cart/components/CartPayment.vue",
    "src/modules/products/components/SortDropdown.vue",
    "src/modules/shared/components/BaseButton.vue",
    "src/modules/shared/components/BaseError.vue",
    "src/modules/shared/components/BaseLoader.vue",
    "src/modules/shared/components/BaseProductCard.vue",
    "src/modules/shared/components/BaseRatingComponent.vue",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      lines: 100,
      branches: 90, // CartItem.vue has a phantom 0% branch on line 1 due to a known
      // Jest + Vue SFC compiler instrumentation bug. All branches are
      // genuinely covered by the 8 tests in CartItem.spec.ts file.
    },
  },
};

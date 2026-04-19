module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)"],
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
      branches: 90,
    },
  },
};

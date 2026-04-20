/**
 * useProductsSorting composable
 *
 * Provides client-side sorting of the products list from the store.
 * Sorting is applied reactively whenever sortBy changes.
 *
 * Returns:
 *  - products: ComputedRef<ProductType[]> — sorted product array
 *  - sortBy: Ref<string> — current sort key, set from SortDropdown
 */

import { useProductsStore } from "@/modules/products/store/products";
import { computed, ref } from "vue";

export function useProductsSorting() {
  const productsStore = useProductsStore();
  const sortBy = ref("");

  const products = computed(() => {
    const products = productsStore.products;

    switch (sortBy.value) {
      case "Highest Rating":
        return products
          .slice()
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

      case "Low to high":
        return products.slice().sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

      case "High to low":
        return products.slice().sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

      case "discount":
        return products
          .slice()
          .sort(
            (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
          );

      case "brand":
        return products
          .slice()
          .sort((a, b) => (a.brand ?? "").localeCompare(b.brand ?? ""));

      case "category":
        return products
          .slice()
          .sort((a, b) => (a.category ?? "").localeCompare(b.category ?? ""));

      default:
        return products;
    }
  });

  return { products, sortBy };
}

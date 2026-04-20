/**
 * useFetchProducts composable
 *
 * Handles fetching paginated products for the products page,
 * including loading states, error handling, and load-more pagination.
 *
 * Returns:
 *  - loading: Ref<boolean> — true on initial/reset fetch
 *  - loadingMore: Ref<boolean> — true when loading additional pages
 *  - error: Ref<string | null> — error message if fetch fails
 *  - offset: Ref<number> — current pagination page offset
 *  - getProducts(params) — fetches products with given limit/skip/category
 *  - handleLoadMore() — increments offset and fetches next page
 */

import { useProductsStore } from "@/modules/products/store/products";
import { ref } from "vue";
import { useRoute } from "vue-router";

export function useFetchProducts() {
  const productsStore = useProductsStore();
  const route = useRoute();

  const offset = ref(0);
  const loading = ref(false);
  const loadingMore = ref(false);
  const error = ref<string | null>(null);

  async function getProducts({
    limit,
    skip,
    category,
  }: {
    limit: number;
    skip: number;
    category?: string | undefined;
  }) {
    if (skip === 0) {
      loading.value = true;
      error.value = null;
    } else {
      loadingMore.value = true;
    }
    try {
      await productsStore.fetchProducts({ limit, skip, category });
    } catch (err) {
      error.value = "Failed to load products. Please try again.";
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  }

  function handleLoadMore() {
    const category = route.query.category as string | undefined;

    offset.value++;
    getProducts({
      limit: 12,
      skip: 12 * offset.value,
      category,
    });
  }

  return {
    loading,
    loadingMore,
    error,
    offset,
    getProducts,
    handleLoadMore,
  };
}

import { useProductsStore } from "@/modules/products/store/products";
import { getProductBySearchQuery } from "@/services/product.service";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { slugify } from "./slugify";
import { ProductType } from "@/types";

export function useSearch() {
  const route = useRoute();
  const router = useRouter();

  const productsStore = useProductsStore();

  const searchLoading = ref(false);
  const searchQuery = ref("");
  const searchResults = ref<ProductType[]>([]);
  const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

  watch(
    () => route.fullPath,
    () => {
      searchQuery.value = "";
      searchResults.value = [];
    }
  );

  const showNoResults = computed(() => {
    return (
      searchQuery.value.trim().length > 0 &&
      !searchLoading.value &&
      searchResults.value.length === 0
    );
  });

  function handleSearchInput() {
    clearTimeout(searchTimeout.value ?? undefined);

    if (!searchQuery.value.trim()) {
      searchResults.value = [];
      return;
    }

    searchTimeout.value = setTimeout(async () => {
      searchLoading.value = true;
      try {
        const { currentProducts } = await getProductBySearchQuery(
          searchQuery.value
        );
        searchResults.value = currentProducts.slice(0, 6);
      } catch (error) {
        searchResults.value = [];
      } finally {
        searchLoading.value = false;
      }
    }, 300);
  }

  function handleSearch() {
    if (searchResults.value.length > 0) {
      handleSelectResult(searchResults.value[0]);
    }
  }

  function handleSelectResult(product: ProductType) {
    productsStore.setSelectedProductDirect(product);

    const slug = slugify(product.title);

    const targetPath = `/products/${product.id}/${slug}`;
    if (route.path === targetPath) return;
    router.push(`/products/${product.id}/${slug}`);

    searchQuery.value = "";
    searchResults.value = [];
  }

  return {
    showNoResults,
    handleSearchInput,
    handleSearch,
    handleSelectResult,
    searchLoading,
    searchQuery,
    searchResults,
  };
}

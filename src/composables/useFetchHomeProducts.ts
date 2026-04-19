import { useProductsStore } from "@/modules/products/store/products";
import { computed, ref } from "vue";

export function useFetchHomeProducts() {
  const productsStore = useProductsStore();

  const homeLoading = ref(false);
  const homeError = ref<string | null>(null);

  const products = computed(() => {
    return productsStore.homeProducts;
  });

  async function getHomeProducts() {
    homeLoading.value = true;
    homeError.value = null;
    try {
      await productsStore.fetchHomeProducts();
    } catch (error) {
      homeError.value = "Failed to load products. Please try again.";
    } finally {
      homeLoading.value = false;
    }
  }

  return { products, getHomeProducts, homeError, homeLoading };
}

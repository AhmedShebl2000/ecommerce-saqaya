import { useProductsStore } from "@/modules/products/store/products";
import { computed, ref } from "vue";

export function useFetchFlashsaleProducts() {
  const productsStore = useProductsStore();

  const flashLoading = ref(false);
  const flashError = ref<string | null>(null);

  const flashSaleProducts = computed(() => {
    return productsStore.flashSalesProducts;
  });

  async function getFlashSaleProducts() {
    flashLoading.value = true;
    flashError.value = null;
    try {
      await productsStore.fetchFlashSaleProducts();
    } catch (error) {
      flashError.value = "Failed to load flash sales. Please try again.";
    } finally {
      flashLoading.value = false;
    }
  }

  return { flashLoading, flashError, flashSaleProducts, getFlashSaleProducts };
}

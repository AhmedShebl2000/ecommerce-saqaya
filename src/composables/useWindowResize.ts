import { onBeforeUnmount, onMounted } from "vue";

export function useWindowResize(cb: () => void) {
  onMounted(() => {
    cb();
    window.addEventListener("resize", cb);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", cb);
  });
}

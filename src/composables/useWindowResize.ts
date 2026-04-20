/**
 * useWindowResize composable
 *
 * Registers a callback on the window resize event and automatically
 * cleans it up when the component is unmounted. Also calls the
 * callback once on mount to set the initial value.
 *
 * @param cb — function to call on mount and on every resize event
 */

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

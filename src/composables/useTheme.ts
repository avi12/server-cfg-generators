import { computed, onMounted, onUnmounted } from "vue";
import { useTheme as useVuetifyTheme } from "vuetify";

export function useAppTheme() {
  const vuetifyTheme = useVuetifyTheme();

  const isDark = computed(() => vuetifyTheme.global.current.value.dark);

  function applyDarkTheme(matches: boolean) {
    void vuetifyTheme.change(matches ? "dark" : "light");
  }

  const mediaQuery = matchMedia("(prefers-color-scheme: dark)");
  applyDarkTheme(mediaQuery.matches);

  function onChange(event: MediaQueryListEvent) {
    applyDarkTheme(event.matches);
  }

  onMounted(() => {
    mediaQuery.addEventListener("change", onChange);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", onChange);
  });

  return { isDark };
}

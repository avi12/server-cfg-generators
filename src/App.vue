<template>
  <v-app class="tabs-background">
    <v-main>
      <v-container>
        <v-card
          class="mx-auto"
          max-width="600"
          :variant="isHome ? 'flat' : 'elevated'"
        >
          <v-container>
            <RouterView />
            <v-btn
              v-if="!isHome"
              icon
              variant="elevated"
              aria-label="Go back"
              to="/"
            >
              <v-icon>{{ mdiArrowLeft }}</v-icon>
            </v-btn>
          </v-container>
        </v-card>
        <footer class="text-center text-caption my-5">
          Made by
          <a
            href="https://avi12.com"
            target="_blank"
            rel="noopener noreferrer"
          >Avi</a>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { useAppTheme } from "@/composables/useTheme";
  import { mdiArrowLeft } from "@mdi/js";
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  useAppTheme();

  const route = useRoute();
  const isHome = computed(() => route.name === "home");
</script>

<style>
:root {
  --color-accent: oklch(55.7% 0.224 263deg);
  --color-divider-cs2: oklch(62.7% 0.194 149deg);
  --color-divider-gmod: oklch(55.7% 0.224 263deg);
  --color-divider-tf2: oklch(69% 0.181 49deg);
  --motion-fast: 250ms;
  --motion-medium: 300ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-fast: 0ms;
    --motion-medium: 0ms;
  }
}

.link--light {
  color: color-mix(in oklch, var(--color-accent) 80%, oklch(0% 0 0deg));
}

.link--dark {
  color: color-mix(in oklch, var(--color-accent) 60%, oklch(100% 0 0deg));
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.tabs-background {
  background-color: oklch(100% 0 0deg);
}

.slide-enter-active,
.slide-leave-active {
  overflow: hidden;
  /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
  transition: max-height var(--motion-medium);
}

@media (prefers-color-scheme: dark) {
  .tabs-background {
    background-color: oklch(17.8% 0 0deg);
  }
}
</style>

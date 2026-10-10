<template>
  <v-app :theme="themeName">
    <v-main>
      <v-container>
        <v-card
          class="mx-auto pa-2"
          max-width="640"
        >
          <v-container>
            <RouterView v-slot="{ Component }">
              <Suspense>
                <component
                  :is="Component"
                  :key="route.path"
                />
                <template #fallback>
                  <div class="d-flex justify-center my-16">
                    <v-progress-circular
                      color="primary"
                      indeterminate
                    />
                  </div>
                </template>
              </Suspense>
            </RouterView>
            <v-btn
              v-if="game"
              icon
              variant="tonal"
              aria-label="Go back"
              to="/"
            >
              <v-icon>{{ mdiArrowLeft }}</v-icon>
            </v-btn>
          </v-container>
        </v-card>
        <footer class="text-center text-body-2 my-5">
          Made by
          <a
            :href="REPO_URL"
            target="_blank"
            rel="noopener noreferrer"
          >Avi</a>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { REPO_URL } from "@/constants/links";
  import { findGame } from "@/data/games";
  import { getThemeName } from "@/theme/m3e";
  import { mdiArrowLeft } from "@mdi/js";
  import { computed, watchEffect } from "vue";
  import { useRoute } from "vue-router";
  import { useTheme } from "vuetify";

  const route = useRoute();
  const theme = useTheme();

  const game = computed(() => findGame(route.name));

  // Game pages take their color scheme from the game; the rest follow the OS
  const themeName = computed(() => {
    if (!game.value) {
      return undefined;
    }

    return getThemeName(theme.global.current.value.dark, game.value.pageUrl);
  });

  // The document scrollbar belongs to <html>, outside <v-app>, so the theme class
  // - which carries the palette the scrollbar styling in main.css reads - is
  // mirrored there as well
  const themeClass = computed(() => `${theme.prefix}theme--${themeName.value ?? theme.name.value}`);

  watchEffect(onCleanup => {
    const className = themeClass.value;
    const { classList } = document.documentElement;
    classList.add(className);
    onCleanup(() => classList.remove(className));
  });
</script>

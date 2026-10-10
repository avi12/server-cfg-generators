<template>
  <div :style="{ '--game-font': game.fontFamily }">
    <h1 class="text-center">
      <span class="d-flex justify-center align-center ga-5 my-5">
        <img
          :alt="game.wordmark ? '' : game.name"
          class="logo-game"
          :class="{ 'logo-game--with-wordmark': game.wordmark }"
          :src="game.logo"
        />
        <span
          v-if="game.wordmark"
          class="game-font text-h4"
        >
          {{ game.wordmark }}
        </span>
      </span>
      <span class="d-block text-h4 headline-emphasized">server.cfg Generator</span>
    </h1>

    <ServerCfgForm
      :generator="generator"
      @submit="playClickSounds"
    />
  </div>
</template>

<script setup lang="ts">
  import ServerCfgForm from "@/components/ServerCfgForm.vue";
  import { useServerCfgGenerator } from "@/composables/useServerCfgGenerator";
  import type { Game } from "@/data/games";

  const props = defineProps<{
    game: Game;
  }>();

  const { default: cvars } = await props.game.loadCvars();

  const generator = useServerCfgGenerator({
    cvars,
    gameName: props.game.name,
    tutorialUrl: props.game.tutorialUrl
  });

  const clickSounds = (props.game.clickSounds ?? []).map(src => new Audio(src));

  function playClickSounds() {
    for (const sound of clickSounds) {
      sound.play().catch(() => undefined);
    }
  }
</script>

<style scoped>
.logo-game {
  max-width: min(300px, 80%);
}

.logo-game--with-wordmark {
  width: 95px;
}
</style>

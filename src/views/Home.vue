<template>
  <div>
    <h1 class="text-h3 headline-emphasized text-center my-8">
      server.cfg Generators
    </h1>

    <v-card
      v-for="game of games"
      :key="game.pageUrl"
      class="mb-3 game-card"
      color="surface-container-high"
      :to="`/${game.pageUrl}`"
    >
      <v-card-item>
        <template #prepend>
          <img
            alt=""
            class="icon-game mr-4"
            :src="game.icon"
          />
        </template>
        <v-card-title class="headline-emphasized">
          {{ game.name }}
        </v-card-title>
        <v-card-subtitle>{{ game.description }}</v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import { games } from "@/data/games";
</script>

<style scoped>
.icon-game {
  width: 48px;
  height: 48px;
}

/* Expressive hover: the card's corners tighten on a spring */
.game-card {
  transition: border-radius var(--m3e-spring-duration) var(--m3e-spring);
}

.game-card:hover,
.game-card:focus-visible {
  border-radius: 16px;
}
</style>

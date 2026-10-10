<template>
  <div>
    <h1 class="text-h4 text-center my-7">
      server.cfg Generators
    </h1>

    <v-card
      v-for="generator of generators"
      :key="generator.pageUrl"
      class="mb-4"
      :to="`/${generator.pageUrl}`"
    >
      <v-card-item>
        <template #prepend>
          <img
            :alt="generator.name"
            class="icon-game mr-3"
            :src="generator.icon"
          />
        </template>
        <v-card-title>{{ generator.name }}</v-card-title>
        <v-card-subtitle>{{ generator.description }}</v-card-subtitle>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import { generators } from "@/data/generators";
</script>

<style scoped>
.icon-game {
  width: 48px;
  height: 48px;
}
</style>

<template>
  <div>
    <h1 class="text-h6 text-center">
      <img
        alt="Counter-Strike 2"
        :src="cs2Logo"
        style="max-width: 300px;"
      />
      <span class="d-block">server.cfg Generator</span>
    </h1>

    <ServerCfgForm
      :generator="generator"
      title-color="green"
    >
      <template #submit="{ onClick }">
        <button
          class="py-3 d-block mx-auto mb-10 text-uppercase"
          type="submit"
          @click="onClick"
        >
          Create server.cfg
        </button>
      </template>
    </ServerCfgForm>
  </div>
</template>

<script setup lang="ts">
  import cs2Logo from "@/assets/img/cs2.svg";
  import ServerCfgForm from "@/components/ServerCfgForm.vue";
  import { useServerCfgGenerator } from "@/composables/useServerCfgGenerator";
  import cs2Cvars from "@/data/cs2-cvars.json";

  const generator = useServerCfgGenerator({ cvars: cs2Cvars });
</script>

<style scoped>
@font-face {
  font-family: "CS2";
  font-style: normal;
  font-display: swap;
  src:
    url("@/assets/fonts/cs2/stratum2-bold.ttf") format("truetype"),
    url("@/assets/fonts/cs2/stratum2-bold.woff") format("woff");
}

[type="submit"] {
  font-family: "CS2", sans-serif;
  font-size: 2.5rem;
  transition: background-color var(--motion-fast);
}

.divider-section {
  border-color: color-mix(in oklch, var(--color-divider-cs2) 80%, oklch(0% 0 0deg));
}

@media (prefers-color-scheme: dark) {
  .divider-section {
    border-color: color-mix(in oklch, var(--color-divider-cs2) 60%, oklch(100% 0 0deg));
  }
}
</style>

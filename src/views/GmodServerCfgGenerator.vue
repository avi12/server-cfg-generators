<template>
  <div>
    <h1 class="text-h6 text-center">
      <span class="d-flex justify-center my-4">
        <svg
          aria-hidden="true"
          class="logo-width"
          viewBox="0 0 263.6 263.7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :d="paths.backdrop"
            fill="#1194F0"
          />
          <path
            :d="paths.g"
            fill="#FFF"
          />
          <path
            :d="paths.eye"
            fill="#1194F0"
          />
        </svg>
        <span class="header__game-name ml-5 align-self-center">
          garry's mod
        </span>
      </span>
      <span class="d-block">server.cfg Generator</span>
    </h1>

    <ServerCfgForm
      :generator="generator"
      title-color="blue"
    >
      <template #submit="{ onClick }">
        <v-btn
          class="px-10 py-3 d-block mx-auto mb-10 text-h4 text-none"
          variant="flat"
          height="100%"
          @click="onClick"
        >
          Create server.cfg
        </v-btn>
      </template>
    </ServerCfgForm>
  </div>
</template>

<script setup lang="ts">
  import ServerCfgForm from "@/components/ServerCfgForm.vue";
  import { useServerCfgGenerator } from "@/composables/useServerCfgGenerator";
  import gmodCvars from "@/data/gmod-cvars.json";

  const paths = {
    backdrop: "M15.2.5C90.8-.3 166.4.5 242 .1c9.4-1.3 16.6 6.7 20.9 14.1 1.2 6.6.5 13.3.6 20 0 69.2-.1 138.5 0 207.7 1 11.3-10.3 22.7-21.6 21.7-73.4-.1-146.8-.1-220.1 0-11.4 1-22.9-10.5-21.7-21.9C.2 168.3.2 95 .1 21.6-1 12 7.3 4.3 15.2.5z",
    g: "M70.6 63.2c9.7-22.4 34.3-37.3 58.7-35.5 14.7.4 29.5 9.2 35.8 22.7-.2-6-.2-12.1-.3-18.1 12.7-.1 25.4-.1 38.2.1v149.4c.1 17.1-7.6 34.1-21.2 44.6-22.3 17.5-54 20.5-80.2 11-23.1-8.4-40.3-31.6-38.7-56.6 11.7-.1 23.4 0 35-.1 1.6 8 3.4 16.9 10.6 21.8 16.4 11.9 43.4 7 53.2-11.3 4.3-10.2 1.3-21.7 1.9-32.4-6 14-22.9 17.6-36.5 18.9-16.5-.6-33.7-5.9-45.3-18.2-11.2-10.4-16.3-25.6-17.1-40.6-3.2-18.6-2.6-38.4 5.9-55.7z",
    eye: "M128.3 61.8c12.8-2.8 27.3 3.6 32.2 16.1 6.1 15.4 6.9 33.3 1.2 48.9-4.9 10.4-15 20.5-27.4 19.3-15.9 1.2-27.5-14.3-30.3-28.5-2.2-13.4-2-27.8 3.6-40.4 3.6-8.2 11.7-14.3 20.7-15.4z"
  };

  const generator = useServerCfgGenerator({ cvars: gmodCvars });
</script>

<style scoped>
@font-face {
  font-family: Gmod;
  font-style: normal;
  font-display: swap;
  src:
    url("@/assets/fonts/gmod/coolvetica-rg.ttf") format("truetype"),
    url("@/assets/fonts/gmod/coolvetica-rg.woff") format("woff");
}

.logo-width {
  width: 95px;
}

.header__game-name {
  font-family: Gmod, Arial, sans-serif !important;
  font-size: 1.75rem;
}

.divider-section {
  border-color: color-mix(in oklch, var(--color-divider-gmod) 80%, oklch(0% 0 0deg));
}

@media (prefers-color-scheme: dark) {
  .divider-section {
    border-color: color-mix(in oklch, var(--color-divider-gmod) 60%, oklch(100% 0 0deg));
  }
}
</style>

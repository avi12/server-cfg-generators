<template>
  <div>
    <h1 class="text-h6 text-center">
      <img
        alt="Team Fortress 2"
        class="logo-game mx-auto my-5"
        :src="tf2Logo"
      />
      <span class="d-block">server.cfg Generator</span>
    </h1>

    <ServerCfgForm
      :generator="generator"
      title-color="orange"
    >
      <template #submit="{ onClick }">
        <button
          class="px-10 py-3 d-block mx-auto mb-10"
          type="submit"
          @click="handleSubmit($event, onClick)"
        >
          Create server.cfg
        </button>
      </template>
    </ServerCfgForm>
  </div>
</template>

<script setup lang="ts">
  import tf2Logo from "@/assets/img/tf2-logo.svg";
  import buttonclickSound from "@/assets/sounds/tf2/buttonclick.wav";
  import buttonclickreleaseSound from "@/assets/sounds/tf2/buttonclickrelease.wav";
  import ServerCfgForm from "@/components/ServerCfgForm.vue";
  import { useServerCfgGenerator } from "@/composables/useServerCfgGenerator";
  import tf2Cvars from "@/data/tf2-cvars.json";

  const generator = useServerCfgGenerator({
    cvars: tf2Cvars,
    isTf2: true
  });

  const sounds = {
    buttonclick: new Audio(buttonclickSound),
    buttonclickrelease: new Audio(buttonclickreleaseSound)
  };

  function handleSubmit(event: MouseEvent, onClick: () => void): void {
    sounds.buttonclick.play().catch(() => undefined);
    sounds.buttonclickrelease.play().catch(() => undefined);
    onClick();
  }
</script>

<style scoped>
.logo-game {
  max-width: 80%;
}

.divider-section {
  border-color: color-mix(in oklch, var(--color-divider-tf2) 80%, oklch(0% 0 0deg));
}

@media (prefers-color-scheme: dark) {
  .divider-section {
    border-color: color-mix(in oklch, var(--color-divider-tf2) 60%, oklch(100% 0 0deg));
  }
}

@font-face {
  font-family: "TF2";
  font-style: normal;
  font-display: swap;
  src: url("@/assets/fonts/tf2/tf2-build.woff") format("woff");
}

[type="submit"] {
  background-color: #807567;
  color: #ebe3cb;
  font-family: "TF2", sans-serif;
  font-size: 2.5rem;
}

[type="submit"]:hover {
  background-color: #8e4638;
}
</style>

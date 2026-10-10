<template>
  <v-form
    class="mt-12"
    @submit.prevent="onSubmit"
  >
    <v-btn
      class="mb-5"
      variant="tonal"
      @click="useDefaultAll"
    >
      Use defaults for everything
    </v-btn>

    <template
      v-for="(entry, i) of cvars"
      :key="i"
    >
      <template v-if="isCvarSection(entry)">
        <v-divider
          v-if="i > 0"
          class="mt-5"
          color="primary"
          :opacity="1"
          thickness="2"
        />
        <h2 class="my-7 text-h5 headline-emphasized text-primary">
          {{ entry.title }}
        </h2>
      </template>

      <template v-else>
        <v-divider
          v-if="i > 0 && !isCvarSection(cvars[i - 1])"
          class="mt-5"
        />
        <ServerCfgFieldRow
          :entry="entry"
          :get-value="cvar => values[cvar]"
          :set-value="(cvar, value) => values[cvar] = value"
          :to-html="toHtml"
        />
      </template>
    </template>

    <v-btn
      class="my-5"
      variant="tonal"
      @click="useDefaultAll"
    >
      Use defaults for everything
    </v-btn>

    <v-checkbox
      v-model="isAlign"
      label="Align the CVars, values and descriptions nicely in the server.cfg?"
    />

    <Transition name="slide">
      <v-alert
        v-show="isError"
        class="mb-5"
        type="error"
        variant="tonal"
      >
        Looks like a required field is still empty. Fill it with the defaults, or
        <v-btn
          color="error"
          variant="outlined"
          size="small"
          @click="scrollToEmptyField"
        >
          scroll up
        </v-btn>
      </v-alert>
    </Transition>

    <v-btn
      class="d-block mx-auto mb-10 game-font"
      size="x-large"
      type="submit"
    >
      Create server.cfg
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
  import ServerCfgFieldRow from "@/components/ServerCfgFieldRow.vue";
  import type { useServerCfgGenerator } from "@/composables/useServerCfgGenerator";
  import { DATA_SELECTOR } from "@/constants/data-attrs";
  import { isCvarSection } from "@/types/cvars";

  const props = defineProps<{
    generator: ReturnType<typeof useServerCfgGenerator>;
  }>();

  const emit = defineEmits<{
    submit: [];
  }>();

  const { isAlign, values, cvars, isError, toHtml, useDefaultAll, generate, findEmptyCvar } = props.generator;

  function onSubmit() {
    emit("submit");
    generate();
  }

  function scrollToEmptyField() {
    const cvar = findEmptyCvar();
    if (!cvar) {
      return;
    }

    const elRow = document.querySelector<HTMLElement>(DATA_SELECTOR.cvar(cvar));
    elRow?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    elRow?.querySelector<HTMLInputElement>("input")?.focus();
  }
</script>

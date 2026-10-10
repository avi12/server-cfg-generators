<template>
  <v-form
    ref="formRef"
    class="mt-12"
    @submit.prevent="onSubmit"
  >
    <v-btn
      class="mb-5"
      @click="useDefaultAll"
    >
      Use defaults for everything
    </v-btn>

    <template
      v-for="(entry, i) of cvars"
      :key="i"
    >
      <v-divider
        v-if="i > 0 && isSection(entry)"
        class="mt-5 divider-section"
      />
      <v-divider
        v-else-if="i > 0 && !isSection(entry) && !isSection(cvars[i - 1])"
        class="mt-5"
        :class="dividerCvarClass"
      />

      <div
        v-if="isSection(entry)"
        class="my-7 text-h5 section-title"
        :style="{ '--theme-base': titleColor }"
      >
        {{ asSection(entry).title }}
      </div>

      <ServerCfgFieldRow
        v-else
        :entry="asItem(entry)"
        :get-value="getValue"
        :set-value="setValue"
        :to-html="toHtml"
      />
    </template>

    <v-btn
      class="mb-5"
      @click="useDefaultAll"
    >
      Use defaults for everything
    </v-btn>

    <v-checkbox
      v-model="alignModel"
      class="justify-center"
      label="Align the CVars, values and descriptions nicely in the server.cfg?"
    />

    <Transition name="slide">
      <div
        v-show="isError"
        class="error--text mb-5"
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
      </div>
    </Transition>

    <slot
      name="submit"
      :on-click="onSubmit"
    />
  </v-form>
</template>

<script setup lang="ts">
  import ServerCfgFieldRow from "@/components/ServerCfgFieldRow.vue";
  import type { useServerCfgGenerator } from "@/composables/useServerCfgGenerator";
  import { DATA_SELECTOR } from "@/constants/data-attrs";
  import type { CvarEntry, CvarItem, CvarSection, CvarValueMap } from "@/types/cvars";
  import { isCvarSection } from "@/types/cvars";
  import { computed } from "vue";
  import { useTheme } from "vuetify";

  const props = defineProps<{
    generator: ReturnType<typeof useServerCfgGenerator>;
    titleColor: string;
  }>();

  const { isAlign, values, cvars, isError, toHtml, useDefaultAll, generate, findEmptyCvar } = props.generator;

  const vuetifyTheme = useTheme();

  const dividerCvarClass = computed(() => ({
    "divider-cvar--light": !vuetifyTheme.global.current.value.dark,
    "divider-cvar--dark": vuetifyTheme.global.current.value.dark
  }));

  const alignModel = computed<boolean>({
    get: () => isAlign.value,
    set(value) {
      isAlign.value = value;
    }
  });

  function isSection(entry: CvarEntry): boolean {
    return isCvarSection(entry);
  }

  function asSection(entry: CvarEntry): CvarSection {
    if (!isCvarSection(entry)) {
      throw new Error("Expected CvarSection");
    }

    return entry;
  }

  function asItem(entry: CvarEntry): CvarItem {
    if (isCvarSection(entry)) {
      throw new Error("Expected CvarItem");
    }

    return entry;
  }

  function getValue(cvar: string): CvarValueMap[string] {
    return values[cvar];
  }

  function setValue(cvar: string, value: CvarValueMap[string]): void {
    values[cvar] = value;
  }

  function onSubmit(): void {
    generate();
  }

  function scrollToEmptyField(): void {
    const cvar = findEmptyCvar();
    if (!cvar) {
      return;
    }

    const element = document.querySelector<HTMLElement>(DATA_SELECTOR.cvar(cvar));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      element.querySelector<HTMLInputElement>("input")?.focus();
    }
  }
</script>

<style scoped>
.section-title {
  color: color-mix(in oklch, var(--theme-base) 70%, oklch(0% 0 0deg));
}

.divider-cvar--light {
  border-color: color-mix(in oklch, var(--color-divider-gmod) 80%, oklch(0% 0 0deg));
}

.divider-cvar--dark {
  border-color: color-mix(in oklch, var(--color-divider-gmod) 60%, oklch(100% 0 0deg));
}

.slide-enter-to,
.slide-leave-from {
  max-height: 100px;
}

@media (prefers-color-scheme: dark) {
  .section-title {
    color: color-mix(in oklch, var(--theme-base) 60%, oklch(100% 0 0deg));
  }
}
</style>

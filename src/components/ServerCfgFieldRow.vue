<template>
  <div
    class="mt-7"
    :data-cvar="entry.cvar"
  >
    CVar:
    <v-tooltip
      text="Click to copy"
      location="top"
    >
      <template #activator="{ props: tooltipProps }">
        <button
          v-bind="tooltipProps"
          type="button"
          class="cvar-copy"
          :aria-label="`Copy CVar ${entry.cvar}`"
          @click="copyToClipboard(entry.cvar)"
        >
          {{ entry.cvar }}
        </button>
      </template>
    </v-tooltip>
    <br />
    <span v-html="toHtml(entry.tutorial)" />

    <v-switch
      v-if="entry.type === CvarType.Checkbox"
      v-model="boolModel"
      :label="`Default: ${entry.defaultValue ? 'Enable' : 'Disable'}`"
    />

    <component
      :is="entry.type === CvarType.Select ? VCombobox : VTextField"
      v-else
      v-model="fieldModel"
      :aria-label="entry.cvar"
      :items="entry.options"
      :placeholder="placeholder"
      :prepend-inner-icon="isMoney ? mdiCurrencyUsd : undefined"
      :rules="isRequired(entry) ? rulesRequired : []"
      :type="entry.type === CvarType.Select ? undefined : entry.type"
      item-title="text"
      item-value="value"
      @keypress="entry.type === CvarType.Number ? onNumberKey($event) : undefined"
    >
      <template
        v-if="isRequired(entry)"
        #prepend
      >
        <v-btn
          variant="outlined"
          @click="setValue(entry.cvar, getDefaultValue(entry))"
        >
          Use default
        </v-btn>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
  import { CvarType, type CvarItem, type CvarValueMap } from "@/types/cvars";
  import { copyToClipboard } from "@/utils/clipboard";
  import {
    getDefaultOption,
    getDefaultValue,
    getPlaceholder,
    isEmptyValue,
    isRequired
  } from "@/utils/cvars";
  import { mdiCurrencyUsd } from "@mdi/js";
  import { computed } from "vue";
  import { VCombobox, VTextField } from "vuetify/components";

  const props = defineProps<{
    entry: CvarItem;
    toHtml: (tutorial: string) => string;
    getValue: (cvar: string) => CvarValueMap[string];
    setValue: (cvar: string, value: CvarValueMap[string]) => void;
  }>();

  const rulesRequired = [
    (value: CvarValueMap[string]) => !isEmptyValue(value) || "This cannot be empty"
  ];

  const isMoney = computed(() => /cash|money/.test(props.entry.cvar));

  const placeholder = computed(() => {
    if (props.entry.type !== CvarType.Select) {
      return getPlaceholder(props.entry);
    }

    return `Default: ${getDefaultOption(props.entry)?.text ?? ""}`;
  });

  const fieldModel = computed({
    get: () => props.getValue(props.entry.cvar),
    set: value => props.setValue(props.entry.cvar, value)
  });

  const boolModel = computed<boolean>({
    get: () => Boolean(props.getValue(props.entry.cvar)),
    set: value => props.setValue(props.entry.cvar, value)
  });

  function onNumberKey(event: KeyboardEvent) {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  }
</script>

<style scoped>
.cvar-copy {
  padding: 0;
  border: none;
  background: none;
  color: rgb(var(--v-theme-primary));
  font: inherit;
  cursor: pointer;
}
</style>

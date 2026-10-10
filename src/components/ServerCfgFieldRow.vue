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
          :class="{ 'link--dark': isDark, 'link--light': !isDark }"
          :aria-label="`Copy CVar ${entry.cvar}`"
          @click="copyCvar"
        >
          {{ entry.cvar }}
        </button>
      </template>
    </v-tooltip>
    <br />
    <span v-html="toHtml(entry.tutorial)" />

    <v-text-field
      v-if="entry.type === CvarType.Text || entry.type === CvarType.Number"
      ref="inputRef"
      v-model="textModel"
      :aria-label="entry.cvar"
      :placeholder="placeholder"
      :prepend-inner-icon="entry.cvar.match(/cash|money/) ? mdiCurrencyUsd : ''"
      :rules="entry.defaultValue !== undefined ? rulesText : []"
      :type="entry.type"
      @keypress="entry.type === CvarType.Number ? onNumberKey($event) : undefined"
    >
      <template
        v-if="entry.defaultValue !== undefined"
        #prepend
      >
        <v-btn
          variant="outlined"
          @click="setStringDefault"
        >
          Use default
        </v-btn>
      </template>
    </v-text-field>

    <v-switch
      v-else-if="entry.type === CvarType.Checkbox"
      v-model="boolModel"
      :label="`Default: ${entry.defaultValue ? 'Enable' : 'Disable'}`"
    />

    <v-combobox
      v-else-if="entry.type === CvarType.Select && entry.options"
      v-model="selectModel"
      :aria-label="entry.cvar"
      :items="entry.options"
      :placeholder="`Default: ${entry.options.find(option => option.value === entry.defaultValue)?.text ?? ''}`"
      :rules="rulesSelect"
      item-title="text"
      item-value="value"
    >
      <template #prepend>
        <v-btn
          variant="outlined"
          @click="setSelectDefault"
        >
          Use default
        </v-btn>
      </template>
    </v-combobox>

    <v-text-field
      v-else-if="entry.type === CvarType.Email"
      v-model="textModel"
      :aria-label="entry.cvar"
      type="email"
    />
  </div>
</template>

<script setup lang="ts">
  import { CvarType, type CvarItem, type CvarOption, type CvarValueMap } from "@/types/cvars";
  import { copyToClipboard } from "@/utils/clipboard";
  import { mdiCurrencyUsd } from "@mdi/js";
  import { computed, useTemplateRef } from "vue";
  import { useTheme } from "vuetify";

  const CVAR_RCON_PASSWORD = "rcon_password";

  const props = defineProps<{
    entry: CvarItem;
    toHtml: (tutorial: string) => string;
    getValue: (cvar: string) => CvarValueMap[string];
    setValue: (cvar: string, value: CvarValueMap[string]) => void;
  }>();

  const inputRef = useTemplateRef<{ $el?: HTMLElement } | HTMLElement>("inputRef");
  defineExpose({ inputRef });

  const vuetifyTheme = useTheme();
  const isDark = computed(() => vuetifyTheme.global.current.value.dark);

  function isCvarOption(value: unknown): value is CvarOption {
    return typeof value === "object" && value !== null && "value" in value;
  }

  const rulesText = [
    (value: unknown) => typeof value !== "string" || value !== "" || "This cannot be empty"
  ];

  const rulesSelect = [
    (option: unknown) => (isCvarOption(option) && Boolean(option.text)) || "This cannot be empty"
  ];

  const placeholder = computed(() => {
    if (props.entry.defaultValue !== undefined) {
      return `E.g. ${props.entry.defaultValue}`;
    }

    return props.entry.cvar === CVAR_RCON_PASSWORD ? "(Recommended)" : "(Optional)";
  });

  const textModel = computed<string>({
    get() {
      const value = props.getValue(props.entry.cvar);
      return typeof value === "string" || typeof value === "number" ? String(value) : "";
    },
    set: value => props.setValue(props.entry.cvar, value)
  });

  const boolModel = computed<boolean>({
    get: () => Boolean(props.getValue(props.entry.cvar)),
    set: value => props.setValue(props.entry.cvar, value)
  });

  const selectModel = computed<CvarOption | undefined>({
    get() {
      const value = props.getValue(props.entry.cvar);
      return isCvarOption(value) ? value : undefined;
    },
    set(value) {
      if (value !== undefined) {
        props.setValue(props.entry.cvar, value);
      }
    }
  });

  async function copyCvar(): Promise<void> {
    await copyToClipboard(props.entry.cvar);
  }

  function setSelectDefault(): void {
    if (!props.entry.options) {
      return;
    }

    const match = props.entry.options.find(option => option.value === props.entry.defaultValue);
    if (match) {
      props.setValue(props.entry.cvar, match);
    }
  }

  function setStringDefault(): void {
    if (props.entry.defaultValue !== undefined) {
      props.setValue(props.entry.cvar, props.entry.defaultValue);
    }
  }

  function onNumberKey(event: KeyboardEvent): void {
    if (!event.key.match(/\d/)) {
      event.preventDefault();
    }
  }
</script>

<style scoped>
.cvar-copy {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
}
</style>

import { CvarType, type CvarItem, type CvarOption, type CvarValueMap } from "@/types/cvars";

const CVAR_RCON_PASSWORD = "rcon_password";

export function isCvarOption(value: unknown): value is CvarOption {
  return typeof value === "object" && value !== null && "value" in value;
}

export function isEmptyValue(value: CvarValueMap[string]) {
  if (value === "" || value === undefined || value === null) {
    return true;
  }

  return isCvarOption(value) && (!("text" in value) || value.text === "");
}

// A field must be filled before generating when it has a default to fall back on
export function isRequired(item: CvarItem) {
  return item.defaultValue !== undefined && item.type !== CvarType.Checkbox;
}

export function getDefaultOption(item: CvarItem) {
  return item.options?.find(option => option.value === item.defaultValue);
}

export function getDefaultValue(item: CvarItem): CvarValueMap[string] {
  return item.type === CvarType.Select ? getDefaultOption(item) : item.defaultValue;
}

export function getPlaceholder(item: CvarItem) {
  if (item.defaultValue !== undefined && item.defaultValue !== null) {
    return `E.g. ${item.defaultValue}`;
  }

  return item.cvar === CVAR_RCON_PASSWORD ? "(Recommended)" : "(Optional)";
}

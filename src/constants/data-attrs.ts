export const DATA_ATTR = {
  CVAR: "data-cvar"
} as const;

export const DATA_SELECTOR = {
  cvar: (value: string) => `[${DATA_ATTR.CVAR}="${value}"]`
} as const;

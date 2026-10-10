import {
  argbFromHex,
  type DynamicScheme,
  Hct,
  hexFromArgb,
  SchemeExpressive
} from "@material/material-color-utilities";
import type { ThemeDefinition } from "vuetify";

// Material's own baseline seed, used where no game picks a color
export const SEED_BASE = "#6750A4";

const ROLES = [
  "primary",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "outline",
  "outlineVariant",
  "inverseSurface",
  "inverseOnSurface",
  "inversePrimary"
] as const satisfies (keyof DynamicScheme)[];

function toKebabCase(role: string) {
  return role.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

// Vuetify's "system" theme switches between themes named exactly light/dark,
// so the base pair keeps those names and every game pair is prefixed
export function getThemeName(isDark: boolean, prefix?: string) {
  const mode = isDark ? "dark" : "light";
  return prefix ? `${prefix}-${mode}` : mode;
}

export function buildColors(seedColor: string, isDark: boolean) {
  // The 2025 spec is the Material 3 Expressive color system
  const scheme = new SchemeExpressive(Hct.fromInt(argbFromHex(seedColor)), isDark, 0, "2025");
  const colors: Record<string, string> = {};
  for (const role of ROLES) {
    colors[toKebabCase(role)] = hexFromArgb(scheme[role]);
  }
  return colors;
}

function buildTheme(seedColor: string, isDark: boolean): ThemeDefinition {
  return {
    dark: isDark,
    colors: buildColors(seedColor, isDark)
  };
}

export function buildThemes(seedColor: string, prefix?: string) {
  return {
    [getThemeName(false, prefix)]: buildTheme(seedColor, false),
    [getThemeName(true, prefix)]: buildTheme(seedColor, true)
  };
}

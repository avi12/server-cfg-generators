import { games } from "@/data/games";
import { buildThemes, SEED_BASE } from "@/theme/m3e";
import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles";

export const vuetify = createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: "system",
    themes: Object.assign(
      buildThemes(SEED_BASE),
      ...games.map(game => buildThemes(game.seedColor, game.pageUrl))
    )
  },
  // Material 3 Expressive: pill buttons, extra-large card corners, tonal surfaces
  defaults: {
    VBtn: {
      color: "primary",
      rounded: "pill"
    },
    VCard: {
      color: "surface-container-low",
      rounded: "xl"
    },
    VTextField: {
      variant: "outlined",
      rounded: "lg",
      color: "primary"
    },
    VCombobox: {
      variant: "outlined",
      rounded: "lg",
      color: "primary"
    },
    VSwitch: {
      color: "primary",
      inset: true
    },
    VCheckbox: {
      color: "primary"
    },
    VAlert: {
      rounded: "xl"
    },
    VTooltip: {
      contentClass: "rounded-lg"
    }
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  }
});

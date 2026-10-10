import { PAGE_URLS } from "./src/constants/page-urls";
import { buildColors, SEED_BASE } from "./src/theme/m3e";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import vuetify from "vite-plugin-vuetify";

/**
 * Paints the page in the theme's own surface color before the app loads and
 * tells the browser chrome which colors to use, in both color schemes.
 */
function injectColorScheme(): Plugin {
  return {
    name: "inject-color-scheme",
    transformIndexHtml() {
      const light = buildColors(SEED_BASE, false)["background"];
      const dark = buildColors(SEED_BASE, true)["background"];

      return [
        {
          tag: "meta",
          attrs: {
            name: "color-scheme",
            content: "light dark"
          },
          injectTo: "head"
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: light,
            media: "(prefers-color-scheme: light)"
          },
          injectTo: "head"
        },
        {
          tag: "meta",
          attrs: {
            name: "theme-color",
            content: dark,
            media: "(prefers-color-scheme: dark)"
          },
          injectTo: "head"
        },
        {
          tag: "style",
          children: `html { background-color: light-dark(${light}, ${dark}); }`,
          injectTo: "head"
        }
      ];
    }
  };
}

/**
 * GitHub Pages has no SPA rewrites, so give every route its own copy of
 * index.html. Deep links then return 200 instead of falling back to 404.html.
 */
function emitRoutePages(): Plugin {
  return {
    name: "emit-route-pages",
    enforce: "post",
    generateBundle(_, bundle) {
      const index = bundle["index.html"];
      if (index?.type !== "asset") {
        return;
      }

      for (const pageUrl of PAGE_URLS) {
        this.emitFile({
          type: "asset",
          fileName: `${pageUrl}/index.html`,
          source: index.source
        });
      }
    }
  };
}

export default defineConfig({
  // Served from https://avi12.github.io/server-cfg-generators/
  base: "/server-cfg-generators/",
  plugins: [vue(), vuetify({
    autoImport: true,
    styles: {
      configFile: "src/styles/settings.scss"
    }
  }), injectColorScheme(), emitRoutePages()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    target: "esnext"
  }
});

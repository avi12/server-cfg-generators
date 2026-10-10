import { PAGE_URLS } from "./src/constants/page-urls";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import vuetify from "vite-plugin-vuetify";

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
  plugins: [vue(), vuetify({ autoImport: true }), emitRoutePages()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  build: {
    target: "esnext"
  }
});

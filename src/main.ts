import App from "@/App.vue";
import { vuetify } from "@/plugins/vuetify";
import { router } from "@/router";
import "@/styles/main.css";
import "@fontsource-variable/roboto-flex/full.css";
import { createApp } from "vue";

createApp(App)
  .use(router)
  .use(vuetify)
  .mount("#app");

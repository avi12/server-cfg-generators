import App from "@/App.vue";
import { vuetify } from "@/plugins/vuetify";
import { router } from "@/router";
import { createApp } from "vue";

createApp(App)
  .use(router)
  .use(vuetify)
  .mount("#app");

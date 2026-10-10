import { generators } from "@/data/generators";
import Home from "@/views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const TITLE_HOME = "server.cfg Generators";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: TITLE_HOME
      }
    },
    ...generators.map(generator => ({
      path: `/${generator.pageUrl}`,
      name: generator.pageUrl,
      component: generator.component,
      meta: {
        title: `${generator.name} server.cfg Generator`
      }
    })),
    {
      path: "/:pathMatch(.*)*",
      redirect: "/"
    }
  ],
  scrollBehavior: () => ({ top: 0 })
});

router.afterEach(to => {
  document.title = typeof to.meta["title"] === "string" ? to.meta["title"] : TITLE_HOME;
});

import { games } from "@/data/games";
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
    ...games.map(game => ({
      path: `/${game.pageUrl}`,
      name: game.pageUrl,
      component: () => import("@/views/GeneratorPage.vue"),
      props: {
        game
      },
      meta: {
        title: `${game.name} server.cfg Generator`
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

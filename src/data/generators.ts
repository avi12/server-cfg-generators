import cs2Icon from "@/assets/img/cs2.svg";
import gmodIcon from "@/assets/img/gmod.svg";
import tf2Icon from "@/assets/img/tf2.svg";
import type { PageUrl } from "@/constants/page-urls";
import type { Component } from "vue";

interface Generator {
  name: string;
  description: string;
  pageUrl: PageUrl;
  icon: string;
  component: () => Promise<Component>;
}

export const generators: Generator[] = [
  {
    name: "Team Fortress 2",
    description: "Whip up a server.cfg for your TF2 server!",
    pageUrl: "tf2",
    icon: tf2Icon,
    component: () => import("@/views/Tf2ServerCfgGenerator.vue")
  },
  {
    name: "Counter-Strike 2",
    description: "Whip up a server.cfg for your CS2 server!",
    pageUrl: "cs2",
    icon: cs2Icon,
    component: () => import("@/views/Cs2ServerCfgGenerator.vue")
  },
  {
    name: "Garry's Mod",
    description: "Whip up a server.cfg for your Garry's Mod server!",
    pageUrl: "gmod",
    icon: gmodIcon,
    component: () => import("@/views/GmodServerCfgGenerator.vue")
  }
];

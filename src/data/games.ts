import cs2Logo from "@/assets/img/cs2.svg";
import gmodLogo from "@/assets/img/gmod.svg";
import tf2Logo from "@/assets/img/tf2-logo.svg";
import tf2Icon from "@/assets/img/tf2.svg";
import tf2ButtonClick from "@/assets/sounds/tf2/buttonclick.wav";
import tf2ButtonClickRelease from "@/assets/sounds/tf2/buttonclickrelease.wav";
import type { PageUrl } from "@/constants/page-urls";
import type { CvarEntry } from "@/types/cvars";

export interface Game {
  pageUrl: PageUrl;
  name: string;
  description: string;
  icon: string;
  logo: string;
  // Shown beside the logo when the logo itself carries no game name
  wordmark?: string;
  // Material 3 Expressive derives the page's whole color scheme from this
  seedColor: string;
  // Declared with @font-face in styles/main.css
  fontFamily: string;
  loadCvars: () => Promise<{ default: CvarEntry[] }>;
  tutorialUrl?: string;
  clickSounds?: string[];
}

export const games: Game[] = [
  {
    pageUrl: "tf2",
    name: "Team Fortress 2",
    description: "Whip up a server.cfg for your TF2 server!",
    icon: tf2Icon,
    logo: tf2Logo,
    seedColor: "#CF6A32",
    fontFamily: "TF2",
    loadCvars: () => import("@/data/tf2-cvars.json"),
    tutorialUrl: "https://www.youtube.com/watch?v=ix2qd__akf8",
    clickSounds: [tf2ButtonClick, tf2ButtonClickRelease]
  },
  {
    pageUrl: "cs2",
    name: "Counter-Strike 2",
    description: "Whip up a server.cfg for your CS2 server!",
    icon: cs2Logo,
    logo: cs2Logo,
    seedColor: "#16A34A",
    fontFamily: "CS2",
    loadCvars: () => import("@/data/cs2-cvars.json")
  },
  {
    pageUrl: "gmod",
    name: "Garry's Mod",
    description: "Whip up a server.cfg for your Garry's Mod server!",
    icon: gmodLogo,
    logo: gmodLogo,
    wordmark: "garry's mod",
    seedColor: "#1194F0",
    fontFamily: "Gmod",
    loadCvars: () => import("@/data/gmod-cvars.json")
  }
];

export function findGame(pageUrl: unknown) {
  return games.find(game => game.pageUrl === pageUrl);
}

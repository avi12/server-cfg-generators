/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}

declare module "@/data/cs2-cvars.json" {
  import type { CvarEntry } from "@/types/cvars";

  const value: CvarEntry[];
  export default value;
}

declare module "@/data/gmod-cvars.json" {
  import type { CvarEntry } from "@/types/cvars";

  const value: CvarEntry[];
  export default value;
}

declare module "@/data/tf2-cvars.json" {
  import type { CvarEntry } from "@/types/cvars";

  const value: CvarEntry[];
  export default value;
}

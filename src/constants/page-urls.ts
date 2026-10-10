// Kept free of asset/component imports so vite.config.ts can read it too
export const PAGE_URLS = ["tf2", "cs2", "gmod"] as const;

export type PageUrl = typeof PAGE_URLS[number];

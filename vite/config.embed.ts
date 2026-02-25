import { pluginsBase, r } from "./common";

import { defineConfig } from "vite";

export default defineConfig({
  ...pluginsBase(false),
  build: {
    lib: {
      entry: r("src/embed.tsx"),
      name: "Accessibility",
      formats: ["iife"],
      fileName: () => `accessibility-embed.js`
    },
    outDir: "dist/embed"
  }
});

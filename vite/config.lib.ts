import { pluginsBase, r } from "./common";

import { defineConfig } from "vite";

export default defineConfig({
  ...pluginsBase(),
  build: {
    minify: "terser",
    terserOptions: {
      format: {
        comments: false
      },
      compress: {
        drop_console: true
      }
    },
    lib: {
      entry: r("src/index.tsx"),
      name: "Accessibility",
      formats: ["es", "cjs"],
      fileName: (format) => `accessibility.${format}.js`,
      cssFileName: "accessibility"
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    },
    outDir: "dist/lib"
  }
});

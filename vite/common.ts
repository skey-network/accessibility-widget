import { UserConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "node:url";
import checker from "vite-plugin-checker";
import inspect from "vite-plugin-inspect";
import { dirname, resolve } from "node:path";

import react from "@vitejs/plugin-react";

import tsconfig from "../tsconfig/tsconfig.paths.json";

const here = dirname(fileURLToPath(import.meta.url));
export const rootDir = resolve(here, "..");
export const r = (...p: string[]) => resolve(rootDir, ...p);

const tsconfigPathAliases = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions.paths).map(([key, values]) => {
    let value = values[0];
    if (key.endsWith("/*")) {
      key = key.slice(0, -2);
      value = value.slice(0, -2);
    }

    const nodeModulesPrefix = "node_modules/";
    if (value.startsWith(nodeModulesPrefix)) {
      value = value.replace(nodeModulesPrefix, "");
    } else {
      value = r(value);
    }

    return [key, value];
  })
);

export const pluginsBase = (useDts: boolean = true): UserConfig => ({
  root: rootDir,
  plugins: [
    react(),
    svgr({
      svgrOptions: { memo: true }
    }),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{ts,tsx}" --ext .ts,.tsx'
      },
      stylelint: {
        lintCommand: 'stylelint "./src/**/*.{css,scss,sass,less}"'
      },
      overlay: true
    }),
    inspect(),
    useDts &&
      dts({
        compilerOptions: {
          rootDir: rootDir,
          sourceRoot: r("src")
        },
        entryRoot: r("src"),
        // outDir: r("dist"),
        rollupTypes: true,
        tsconfigPath: r("tsconfig/tsconfig.app.json")
      })
  ],
  resolve: {
    alias: tsconfigPathAliases
  },
  define: {
    /**
     * Ta linijka jest wymagana dla wersji embed widgetu.
     * Bez niej widget nie działa i w konsoli wyświetla
     * się błąd: Uncaught ReferenceError: process is not defined
     */
    "process.env.NODE_ENV": '"production"'
  }
});

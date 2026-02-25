import { defineConfig } from "vite";
import { pluginsBase } from "./vite/common";

export default defineConfig({
  ...pluginsBase(false)
});

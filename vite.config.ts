/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  // Keep the existing env var names (REACT_APP_*) so .env files and
  // deployment config don't need to change.
  envPrefix: "REACT_APP_",
  css: {
    preprocessorOptions: {
      // Lets SCSS import "utils/..." relative to src, like CRA did.
      scss: { loadPaths: ["src"] },
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    passWithNoTests: true,
  },
});

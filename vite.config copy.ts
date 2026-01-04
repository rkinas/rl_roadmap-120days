import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  // IMPORTANT: This base path is required for GitHub Pages deployment
  // If your repo is named 'my-repo', this should be '/my-repo/'
  // For user/org pages (username.github.io), this should be '/'
  base: './', 
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

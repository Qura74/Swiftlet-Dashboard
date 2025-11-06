import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Set client directory as the root
  root: path.resolve(__dirname, "client"),
  build: {
    // Output built files into dist/public for Express to serve
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    open: false,
    fs: {
      strict: true,
      allow: [
        path.resolve(__dirname, "client"),
        path.resolve(__dirname, "shared"),
      ],
    },
  },
});

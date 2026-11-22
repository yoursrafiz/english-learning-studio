import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Standalone build: plain Vite + React. No Muse hosting, no server.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

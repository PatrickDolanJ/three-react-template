import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";
console.log(glsl());
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [glsl(), react()],
});

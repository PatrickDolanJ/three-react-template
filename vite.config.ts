import { defineConfig, Plugin } from "vite";
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/

const fullReloadAlways: Plugin = {
  name: "full-reload",
  handleHotUpdate({ server }) {
    server.hot.send({ type: "full-reload" });
    return [];
  },
};

export default defineConfig({
  plugins: [
    fullReloadAlways,
    react(),
    glsl({
      include: [
        // Glob pattern, or array of glob patterns to import
        "**/*.glsl",
        "**/*.wgsl",
        "**/*.vert",
        "**/*.frag",
        "**/*.vs",
        "**/*.fs",
      ],
      exclude: undefined, // Glob pattern, or array of glob patterns to ignore
      warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
      removeDuplicatedImports: false, // Automatically remove an already imported chunk
      defaultExtension: "glsl", // Shader suffix when no extension is specified
      minify: false, // Minify/optimize output shader code
      watch: true, // Recompile shader on change
      root: "/", // Directory for root imports
    }),
  ],
});

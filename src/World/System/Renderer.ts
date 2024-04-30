import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, precision: "highp" });
  renderer.useLegacyLights = true;

  return renderer;
}

export default createRenderer;

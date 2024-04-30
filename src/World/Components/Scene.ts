import { Color, Scene, Fog } from "three";

function createScene(
  backgroundColor = new Color().setRGB(0.13, 0.13, 0.14),
  fogColor = new Color().setRGB(0.2, 0.16, 0.25),
  fogNear = 100,
  fogFar = 355
) {
  const scene = new Scene();
  scene.background = backgroundColor;
  scene.fog = new Fog(fogColor, fogNear, fogFar);
  return scene;
}

export { createScene };

import * as THREE from "three";
import { Renderer } from "./Renderer";

const setSize = (
  container: HTMLElement,
  camera: THREE.PerspectiveCamera | THREE.Camera,
  renderer: Renderer
) => {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.composer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(
    container: HTMLElement,
    camera: THREE.Camera,
    renderer: Renderer
  ) {
    setSize(container, camera, renderer);
    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
    });
  }
}
export { Resizer };

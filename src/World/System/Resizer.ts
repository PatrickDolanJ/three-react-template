import { PerspectiveCamera, Camera, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/Addons.js";

const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera | Camera,
  renderer: WebGLRenderer,
  composer: EffectComposer
) => {
  if (camera instanceof PerspectiveCamera) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.setSize(container.clientWidth, container.clientHeight);
  composer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(
    container: HTMLElement,
    camera: Camera,
    renderer: WebGLRenderer,
    composer: EffectComposer
  ) {
    setSize(container, camera, renderer, composer);
    window.addEventListener("resize", () => {
      setSize(container, camera, renderer, composer);
    });
  }
}
export { Resizer };

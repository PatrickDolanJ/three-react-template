import { PerspectiveCamera, Camera, WebGLRenderer } from "three";

const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera | Camera,
  renderer: WebGLRenderer
) => {
  if (camera instanceof PerspectiveCamera) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container: HTMLElement, camera: Camera, renderer: WebGLRenderer) {
    setSize(container, camera, renderer);
    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
    });
  }
}
export { Resizer };

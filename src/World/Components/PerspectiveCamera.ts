import { PerspectiveCamera } from "three";
class BasicCamera extends PerspectiveCamera {
  constructor(container: HTMLElement) {
    const fov = 35; // Field of View
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1; // the near clipping plane
    const far = 1000; // the far clipping plane

    super(fov, aspect, near, far);

    // move the camera back so we can view the scene
    this.position.set(0, 0, 50);
  }
}

export { BasicCamera };

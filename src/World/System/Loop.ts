import { Clock, Scene, Camera, WebGLRenderer } from "three";
const clock = new Clock();

export interface Updateables {
  tick: (delta?: number) => void;
}

class Loop {
  updatables: Updateables[];
  camera;
  renderer: WebGLRenderer;
  scene;

  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };

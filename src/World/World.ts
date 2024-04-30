import {
  AxesHelper,
  Camera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector3,
} from "three";
import { createCamera } from "./Components/PerspectiveCamera";
import createRenderer from "./System/Renderer";
import { createScene } from "./Components/Scene";
import { Loop } from "./System/Loop";
import { Resizer } from "./System/Resizer";
import {
  createOrbitControls,
  OrbitController,
} from "./Components/OrbitController";

//----------------------Settings---------------------

class World {
  scene: Scene;
  camera: PerspectiveCamera | Camera;
  renderer: WebGLRenderer;
  loop: Loop;
  orbitController: OrbitController;
  resizer: Resizer;

  constructor(container: HTMLElement) {
    //setup basic three components
    this.scene = createScene();
    this.camera = createCamera(container);
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.orbitController = createOrbitControls(this.camera, container);
    this.resizer = new Resizer(container, this.camera, this.renderer);

    //Helpers
    const axesHelper = new AxesHelper(10);
    this.scene.add(axesHelper);

    //---------------------Test 3D translation for l-system drawing------------
    // const angle = 25;
    // const origin = new Vector3(0, 0, 0);
    // const newX = Math.cos(angle) + origin.x;
    // const newY = Math.sin(angle) + origin.y;
    // const newZ = origin.z;
    // const newPoint = new PointerEvent();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };

import {
  AxesHelper,
  Camera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
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

import { CreateBaseCube } from "./Components/StarterCube";

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
    const starterCube = CreateBaseCube();
    starterCube.position.set(0, 0, 0);
    this.scene.add(starterCube);
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

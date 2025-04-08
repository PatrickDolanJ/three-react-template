import * as THREE from "three";
import { BasicCamera } from "./Components/PerspectiveCamera";
import { Renderer } from "./System/Renderer";
import { BasicScene } from "./Components/Scene";
import { Loop } from "./System/Loop";
import { OrbitController } from "./Components/OrbitController";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Resizer } from "./System/Resizer";
import { StarterCube } from "./Components/StarterCube";

//----------------------Settings---------------------

class World {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: Renderer;
  loop: Loop;
  orbitController?: OrbitControls;
  resizer: Resizer;

  constructor(container: HTMLElement) {
    //Setup core
    this.scene = new BasicScene();
    this.camera = new BasicCamera(container);
    this.renderer = new Renderer(container, this.scene, this.camera);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.orbitController = new OrbitController(this.camera, container);
    this.resizer = new Resizer(container, this.camera, this.renderer);

    //Helpers
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    // Basic Mesh with custom shader
    const starterCube = new StarterCube(5, 5, 1);
    starterCube.position.set(0, 0, 0);
    this.loop.addClickable(starterCube);
    this.loop.addUpdateable(starterCube);
    this.scene.add(starterCube);
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };

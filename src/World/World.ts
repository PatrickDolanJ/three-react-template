import * as THREE from "three";
import { BasicCamera } from "./Components/PerspectiveCamera";
import { Renderer } from "./System/Renderer";
import { BasicScene } from "./Components/Scene";
import { Loop } from "./System/Loop";
import { OrbitController } from "./Components/OrbitController";
import { Resizer } from "./System/Resizer";
import { StarterCube } from "./Components/StarterCube";

//----------------------Settings---------------------

class World {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: Renderer;
  loop: Loop;
  orbitController?: OrbitController;
  resizer: Resizer;

  constructor(container: HTMLElement) {
    //Setup core
    this.scene = new BasicScene();
    this.camera = new BasicCamera(container);
    this.renderer = new Renderer(container, this.scene, this.camera);

    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.orbitController = new OrbitController(this.camera, container);
    this.resizer = new Resizer(container, this.camera, this.renderer);

    //basic Mesh with custom shader
    const starterCube = new StarterCube(5, 5, 5);
    starterCube.position.set(0, 0, 0);
    starterCube.castShadow = true;
    starterCube.receiveShadow = true;
    this.loop.addUpdateable(starterCube);
    this.scene.add(starterCube);

    //lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const dl = new THREE.DirectionalLight(0xffccaa, 3.0);
    dl.position.set(0, 8, 0);
    dl.castShadow = true;
    this.scene.add(dl);

    //Helpers
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    this.scene.add(dlHelper);

    //Ground Plane
    const groundPlane = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.2, 20),
      new THREE.MeshPhongMaterial()
    );
    groundPlane.position.set(0, -5, 0);
    groundPlane.receiveShadow = true;
    this.scene.add(groundPlane);
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };

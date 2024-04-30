import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Updateables } from "../System/Loop";

class OrbitController extends OrbitControls implements Updateables {
  tick = () => {
    this.update();
  };
}

function createOrbitControls(camera: Camera, domElement: HTMLElement) {
  const controller = new OrbitController(camera, domElement);
  controller.autoRotateSpeed = 1.0;
  return controller;
}

export { createOrbitControls, OrbitController };

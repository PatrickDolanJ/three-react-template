import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class OrbitController extends OrbitControls {
  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    super(camera, domElement);
    this.autoRotateSpeed = 1.0;
    this.enablePan = false;
  }
}

export { OrbitController };

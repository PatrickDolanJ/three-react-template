import { Camera } from "three";
import { generateUUID } from "three/src/math/MathUtils.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Updateable } from "../System/Loop";

class OrbitController extends OrbitControls implements Updateable {
  uuid: string;
  constructor(camera: Camera, domElement: HTMLElement) {
    super(camera, domElement);
    this.autoRotateSpeed = 1.0;
    this.uuid = generateUUID();
    this.enablePan = false;
  }

  override update(): boolean {
    return super.update();
  }
}

export { OrbitController };

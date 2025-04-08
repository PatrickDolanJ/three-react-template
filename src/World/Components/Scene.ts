import * as THREE from "three";
class BasicScene extends THREE.Scene {
  constructor(
    backgroundColor = new THREE.Color().setHex(
      0x24212b,
      THREE.LinearSRGBColorSpace
    ),
    fogColor = new THREE.Color().setHex(0x24212b),
    fogNear = 100,
    fogFar = 355
  ) {
    super();
    this.background = backgroundColor;
    this.fog = new THREE.Fog(fogColor, fogNear, fogFar);
    // Used for compatibility with Effect Composer
    this.background.convertSRGBToLinear();
  }
}

export { BasicScene };

import { Color, Scene, Fog } from "three";
class BasicScene extends Scene {
  constructor(
    backgroundColor = new Color().setHex(0x24212b),
    fogColor = new Color().setHex(0x24212b),
    fogNear = 100,
    fogFar = 355
  ) {
    super();
    this.background = backgroundColor;
    this.fog = new Fog(fogColor, fogNear, fogFar);
  }
}

export { BasicScene };

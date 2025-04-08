import * as THREE from "three";
import {
  // DotScreenShader,
  EffectComposer,
  // ShaderPass,
  // RGBShiftShader,
  RenderPass,
  // RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";
import { BasicShaderPass } from "../PostProcessing/Basic/BasicPostProcessingShader";

class Renderer extends THREE.WebGLRenderer {
  composer: EffectComposer;

  constructor(
    container: HTMLElement,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) {
    super({ antialias: true, precision: "highp" });
    this.setPixelRatio(window.devicePixelRatio);
    container.append(this.domElement);
    this.composer = new EffectComposer(this);

    //Post Processing
    this.composer.addPass(new RenderPass(scene, camera));
    // const pixelPass = new RenderPixelatedPass(10, this.scene, this.camera);
    // this.composer.addPass(pixelPass);

    // const dotPass = new ShaderPass(DotScreenShader);
    // dotPass.uniforms["scale"].value = 4.3;
    // this.composer.addPass(dotPass);

    // const chromaticAbPass = new ShaderPass(RGBShiftShader);
    // chromaticAbPass.uniforms["amount"].value = 0.004;
    // this.composer.addPass(chromaticAbPass);

    const basicPass = new BasicShaderPass();
    this.composer.addPass(basicPass);
  }

  renderPostProcess() {
    this.composer.render();
  }
}

export { Renderer };

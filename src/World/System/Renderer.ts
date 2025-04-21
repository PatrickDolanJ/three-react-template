import * as THREE from "three";
import {
  // DotScreenShader,
  EffectComposer,
  GammaCorrectionShader,
  ShaderPass,
  // RGBShiftShader,
  Pass,
  RenderPass,
  // ShaderPass,
  // RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";
// import { BasicShaderPass } from "../PostProcessing/Basic/BasicPostProcessingShader";

class Renderer extends THREE.WebGLRenderer {
  composer: EffectComposer;

  constructor(
    container: HTMLElement,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) {
    super({ antialias: true, precision: "highp" });
    this.setPixelRatio(window.devicePixelRatio);
    this.toneMapping = THREE.NoToneMapping;
    container.append(this.domElement);
    this.composer = new EffectComposer(this);
    this.shadowMap.enabled = true;

    //Post Processing
    this.composer.addPass(new RenderPass(scene, camera));

    // const pixelPass = new RenderPixelatedPass(10, scene, camera);
    // this.composer.addPass(pixelPass);

    //Gamme Correct is needed to maintain scene background, color among other things, with Effect Composer
    // Needs to be after the render passes
    const gammeCorrect = new ShaderPass(GammaCorrectionShader);
    this.composer.addPass(gammeCorrect);

    // const dotPass = new ShaderPass(DotScreenShader);
    // dotPass.uniforms["scale"].value = 4.3;
    // this.composer.addPass(dotPass);

    // const chromaticAbPass = new ShaderPass(RGBShiftShader);
    // chromaticAbPass.uniforms["amount"].value = 0.004;
    // this.composer.addPass(chromaticAbPass);

    // const basicPass = new BasicShaderPass();
    // this.composer.addPass(basicPass);
  }

  renderPostProcess() {
    const uTime = performance.now() / 1000;
    // Manual Injection of current time
    this.composer.passes.forEach((pass: Pass) => {
      if (pass instanceof ShaderPass) {
        pass.uniforms["uTime"] = { value: uTime };
      }
    });
    this.composer.render();
  }
}

export { Renderer };

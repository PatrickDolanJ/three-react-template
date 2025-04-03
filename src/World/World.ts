import { AxesHelper, Camera, Scene, WebGLRenderer } from "three";
import {
  EffectComposer,
  RenderPass,
  ShaderPass,
  DotScreenShader,
  RGBShiftShader,
  RenderPixelatedPass,
} from "three/examples/jsm/Addons.js";
import { BasicCamera } from "./Components/PerspectiveCamera";
import { BasicRenderer } from "./System/Renderer";
import { BasicScene } from "./Components/Scene";
import { Loop } from "./System/Loop";
import { Resizer } from "./System/Resizer";
import { OrbitController } from "./Components/OrbitController";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { StarterCube } from "./Components/StarterCube";
import { BasicShaderPass } from "./PostProcessing/Basic/BasicPostProcessingShader";

//----------------------Settings---------------------

class World {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  loop: Loop;
  orbitController?: OrbitControls;
  resizer: Resizer;
  composer: EffectComposer;

  constructor(container: HTMLElement) {
    //Setup core
    this.scene = new BasicScene();
    this.camera = new BasicCamera(container);
    this.renderer = new BasicRenderer(container);
    this.composer = new EffectComposer(this.renderer);

    this.loop = new Loop(this.camera, this.scene, this.renderer, this.composer);
    this.orbitController = new OrbitController(this.camera, container);
    this.resizer = new Resizer(
      container,
      this.camera,
      this.renderer,
      this.composer
    );

    //Helpers
    const axesHelper = new AxesHelper(10);
    this.scene.add(axesHelper);

    // Basic Mesh with custom shader
    const starterCube = new StarterCube(5, 5, 1);
    starterCube.position.set(0, 0, 0);
    this.loop.addClickable(starterCube);
    this.loop.addUpdateable(starterCube);
    this.scene.add(starterCube);

    //Post Processing
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const effect4 = new RenderPixelatedPass(10, this.scene, this.camera);
    this.composer.addPass(effect4);

    const effect1 = new ShaderPass(DotScreenShader);
    effect1.uniforms["scale"].value = 4.3;
    this.composer.addPass(effect1);
    console.log(effect1);

    const effect2 = new ShaderPass(RGBShiftShader);
    effect2.uniforms["amount"].value = 0.005;
    this.composer.addPass(effect2);

    const effectCustom = new BasicShaderPass();
    console.log(effectCustom);
    this.composer.addPass(effectCustom);
  }

  start() {
    this.loop.start();
  }
  stop() {
    this.loop.stop();
  }
}

export { World };

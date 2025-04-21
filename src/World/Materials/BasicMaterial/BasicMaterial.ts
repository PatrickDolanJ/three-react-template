import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import basicVertShader from "./basicVertex.glsl";
import basicFragShader from "./basicFragment.glsl";

const BasicMat = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhongMaterial,
  vertexShader: basicVertShader,
  fragmentShader: basicFragShader,
  fog: true,
});

export { BasicMat };

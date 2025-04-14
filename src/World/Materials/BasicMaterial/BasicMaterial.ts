import * as THREE from "three";
import basicVertShader from "./basicVertex.glsl";
import basicFragShader from "./basicFragment.glsl";

const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib["fog"]]);
const BasicMat = new THREE.ShaderMaterial({
  uniforms: uniforms,
  defines: {},
  vertexShader: basicVertShader,
  fragmentShader: basicFragShader,
  fog: true,
  transparent: true,
});

export { BasicMat };

import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import basicVertShader from "./basicVertex.glsl";
import basicFragShader from "./basicFragment.glsl";

// const BasicMat = new THREE.ShaderMaterial({
//   uniforms: {
//     ...THREE.UniformsLib.lights,
//     ...THREE.UniformsLib.common,
//     ...THREE.UniformsLib.fog,
//   },
//   defines: {},
//   vertexShader: basicVertShader,
//   fragmentShader: basicFragShader,
//   fog: true,
//   transparent: true,
// });

const BasicMat = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhongMaterial,
  uniforms: {
    ...THREE.UniformsLib.lights,
    ...THREE.UniformsLib.common,
    ...THREE.UniformsLib.fog,
  },
  defines: {},
  vertexShader: basicVertShader,
  fragmentShader: basicFragShader,
  fog: true,
  transparent: true,
});

export { BasicMat };

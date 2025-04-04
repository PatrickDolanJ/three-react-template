import { UniformsLib, UniformsUtils, ShaderMaterial } from "three";
import basicVertShader from "./basicVertex.glsl";
import basicFragShader from "./basicFragment.glsl";

const uniforms = UniformsUtils.merge([UniformsLib["fog"]]);
const BasicMat = new ShaderMaterial({
  uniforms: uniforms,
  defines: {},
  vertexShader: basicVertShader,
  fragmentShader: basicFragShader,
  fog: true,
  transparent: true,
});

export { BasicMat };

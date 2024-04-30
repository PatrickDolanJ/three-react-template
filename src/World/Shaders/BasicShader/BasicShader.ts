import { UniformsLib, UniformsUtils, ShaderMaterial } from "three";
import basicVertShader from "../BasicShader/basicVertex.glsl";
import basicFragShader from "../BasicShader/basicFragment.glsl";

const uniforms = UniformsUtils.merge([UniformsLib["fog"]]);
const BasicShaderMat = new ShaderMaterial({
  uniforms: uniforms,
  defines: {},
  vertexShader: basicVertShader,
  fragmentShader: basicFragShader,
  fog: true,
  transparent: true,
});

export { BasicShaderMat };

import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import basicFragment from "./basicFragment.glsl";
import basicVertex from "./basicVertex.glsl";

class BasicShaderPass extends ShaderPass {
  constructor() {
    super(
      {
        fragmentShader: basicFragment,
        vertexShader: basicVertex,
        uniforms: { tDiffuse: { value: null } },
        name: "BasicShader",
      },
      "tDiffuse"
    );
  }
}

export { BasicShaderPass };

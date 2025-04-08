import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import basicFragment from "./basicFragment.glsl";
import basicVertex from "./basicVertex.glsl";
import { ShaderPassUniforms } from "../../System/Renderer";

class BasicShaderPass extends ShaderPass {
  constructor() {
    super(
      {
        fragmentShader: basicFragment,
        vertexShader: basicVertex,
        uniforms: ShaderPassUniforms,
        name: "BasicShader",
      },
      "tDiffuse"
    );
  }
}

export { BasicShaderPass };

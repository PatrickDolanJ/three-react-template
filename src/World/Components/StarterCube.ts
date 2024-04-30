import { Mesh, BoxGeometry } from "three";
import { BasicShaderMat } from "../Shaders/BasicShader/BasicShader";

function CreateBaseCube() {
  return new Mesh(new BoxGeometry(5, 5), BasicShaderMat);
}

export { CreateBaseCube };

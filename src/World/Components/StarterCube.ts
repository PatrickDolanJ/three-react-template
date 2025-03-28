import { Mesh, BoxGeometry } from "three";
import { BasicShaderMat } from "../Shaders/BasicShader/BasicShader";
import {
  Clickable,
  Hoverable,
  IntersectionData,
  Updateable,
} from "../System/Loop";

class StarterCube extends Mesh implements Hoverable, Clickable, Updateable {
  constructor(
    height: number = 5,
    width: number = 5,
    depth: number = 1,
    widthSegments: number = 1,
    heightSegments: number = 1
  ) {
    super(
      new BoxGeometry(width, height, depth, widthSegments, heightSegments),
      BasicShaderMat
    );
  }

  onHover(data: IntersectionData) {
    console.log("Distance to Startercube(HOVER): " + data.distance);
  }

  onClick(data: IntersectionData) {
    console.log("Distance to Startercube(CLICK): " + data.distance);
  }
  update() {
    this.position.x = Math.sin(performance.now() * 0.001);
  }
}

export { StarterCube };

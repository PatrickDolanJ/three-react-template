import * as THREE from "three";
import gsap from "gsap";
import { BasicMat } from "../Materials/BasicMaterial/BasicMaterial";
import {
  Clickable,
  Hoverable,
  ClickData,
  HoverData,
  Updateable,
} from "../System/Loop";

class StarterCube
  extends THREE.Mesh
  implements Hoverable, Clickable, Updateable
{
  constructor(
    width: number = 5,
    height: number = 5,
    depth: number = 5,
    widthSegments: number = 1,
    heightSegments: number = 1
  ) {
    super(
      new THREE.BoxGeometry(
        width,
        height,
        depth,
        widthSegments,
        heightSegments
      ),
      BasicMat
    );
  }

  onHover(data: HoverData) {
    const tl = gsap.timeline();
    if (data.event === "ENTER") {
      tl.to(this.scale, {
        x: 1.05,
        y: 1.05,
        z: 1.05,
        duration: 0.1,
      });
    } else if (data.event === "EXIT") {
      tl.to(this.scale, {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        duration: 0.1,
      }).then(() => tl.kill());
    }
  }

  onClick(data: ClickData) {
    console.log("Distance to Startercube (CLICK): " + data.distance);
  }
  update() {
    this.position.x = Math.sin(performance.now() * 0.002);
  }
}

export { StarterCube };

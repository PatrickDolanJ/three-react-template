import * as THREE from "three";
import { clamp } from "three/src/math/MathUtils.js";
import { Renderer } from "./Renderer";

const clock = new THREE.Clock();
const mouse = new THREE.Vector2(1, 1);
let hoverRaycaster: THREE.Raycaster;
let clickRaycaster: THREE.Raycaster;

export interface Updateable {
  update(delta?: number): void | boolean; //This is probably dum
  uuid: string;
}
export interface Hoverable {
  onHover(data: HoverData): void;
  uuid: string;
}
export interface Clickable {
  onClick(data: ClickData): void;
  uuid: string;
}

export type ClickData = Omit<THREE.Intersection, "object">;

type HoverEvent = "ENTER" | "DURING" | "EXIT";
export type HoverData = Omit<THREE.Intersection, "object"> & {
  event: HoverEvent;
};

interface HoverStorage {
  hoverable: Hoverable;
  hoverData: HoverData;
}

function isHoverable(obj: unknown): obj is Hoverable {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "onHover" in obj &&
    typeof obj.onHover === "function"
  );
}

function isClickable(obj: unknown): obj is Clickable {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "onClick" in obj &&
    typeof obj.onClick === "function"
  );
}

function mapIntersections<T>(
  intersections: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]
) {
  return intersections.map((item) => {
    const { object, ...rest } = item;
    return { object: object as T, data: rest };
  });
}

class Loop {
  private updatables: Updateable[] = [];
  private hoverStorage: HoverStorage[] = [];
  camera: THREE.Camera;
  renderer: Renderer;
  scene: THREE.Scene;
  maxInterval: number;
  fixedTimeInterval: number;
  isFixedTimeInterval: boolean;

  constructor(
    camera: THREE.PerspectiveCamera | THREE.Camera,
    scene: THREE.Scene,
    renderer: Renderer,
    maxInterval: number = 0.01,
    fixedTimeInterval: number = 0.01,
    isFixedTimeInterval: boolean = false
  ) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.maxInterval = maxInterval;
    this.fixedTimeInterval = fixedTimeInterval;
    this.isFixedTimeInterval = isFixedTimeInterval;

    //Layer for hoverables
    hoverRaycaster = new THREE.Raycaster();
    // hoverRaycaster.layers.set(Layers.HOVER);

    //Layer for clickable
    clickRaycaster = new THREE.Raycaster();
    // clickRaycaster.layers.set(Layers.CLICK);

    document.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });
    document.addEventListener("click", () => {
      this.onClick();
    });
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.update();
      this.renderer.render(this.scene, this.camera);
      // this.renderer.renderPostProcess();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  addUpdateable(obj: Updateable) {
    this.updatables.push(obj);
  }

  removeUpdateable(obj: Updateable) {
    this.updatables = this.updatables.filter((item) => item.uuid != obj.uuid);
  }

  // addHoverable(obj: Hoverable) {
  //   obj.layers.enable(Layers.HOVER);
  // }

  // removeHoverable(obj: Hoverable) {
  //   obj.layers.disable(Layers.HOVER);
  // }

  // addClickable(obj: Clickable) {
  //   obj.layers.enable(Layers.CLICK);
  // }

  // removeClickable(obj: Clickable) {
  //   obj.layers.disable(Layers.CLICK);
  // }

  private update() {
    const clockDelta = clock.getDelta();
    let delta = clamp(clockDelta, 0, this.maxInterval);
    if (this.isFixedTimeInterval) {
      delta = this.fixedTimeInterval;
    }

    for (const object of this.updatables) {
      object.update(delta);
    }
    this.onHover();
  }

  private onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onHover() {
    hoverRaycaster.setFromCamera(mouse, this.camera);

    const intersection = hoverRaycaster
      .intersectObjects(this.scene.children)
      .filter((item) => isHoverable(item.object));

    const hoverables = mapIntersections<Hoverable>(intersection);
    if (hoverables.length > 0) {
      hoverables.forEach((item) => {
        let event: HoverEvent = "ENTER";

        if (
          this.hoverStorage.some(
            (obj) => obj.hoverable.uuid === item.object.uuid
          )
        ) {
          event = "DURING";
        }
        const data: HoverData = { ...item.data, event: event };

        if (
          !this.hoverStorage.some(
            (obj) => obj.hoverable.uuid === item.object.uuid
          )
        ) {
          this.hoverStorage.push({
            hoverable: item.object,
            hoverData: { ...data },
          });
        }
        item.object.onHover(data);
      });
    }

    this.hoverStorage.forEach((item) => {
      if (!hoverables.some((obj) => obj.object.uuid === item.hoverable.uuid)) {
        item.hoverData.event = "EXIT";
        item.hoverable.onHover(item.hoverData);
        this.hoverStorage = this.hoverStorage.filter(
          (obj) => obj.hoverable.uuid !== item.hoverable.uuid
        );
      }
    });
  }

  private onClick() {
    clickRaycaster.setFromCamera(mouse, this.camera);
    const intersection = clickRaycaster.intersectObjects(this.scene.children);
    if (intersection.length == 0 || !isClickable(intersection[0].object)) {
      return;
    } else {
      const clickables = mapIntersections<Clickable>(
        intersection.filter((item) => isClickable(item.object))
      );
      clickables[0].object.onClick(clickables[0].data);
    }
  }
}

export { Loop };

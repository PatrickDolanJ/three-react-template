import {
  Clock,
  Scene,
  Camera,
  WebGLRenderer,
  Vector2,
  Raycaster,
  PerspectiveCamera,
  Object3D,
  Intersection,
  Object3DEventMap,
  Layers as _LAYERS,
} from "three";
import { clamp } from "three/src/math/MathUtils.js";

const clock = new Clock();
const mouse = new Vector2(1, 1);
let hoverRaycaster: Raycaster;
let clickRaycaster: Raycaster;

export enum Layers {
  HOVER = 2,
  CLICK = 4,
}

export interface Updateable {
  update(delta?: number): void | boolean;
  uuid: string;
}
export interface Hoverable {
  onHover(data: IntersectionData): void;
  layers: _LAYERS;
}
export interface Clickable {
  onClick(data: IntersectionData): void;
  layers: _LAYERS;
}

export type IntersectionData = Omit<Intersection, "object">;

function isHoverable(obj: unknown): obj is Hoverable {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "onHover" in obj &&
    typeof (obj as Hoverable).onHover === "function"
  );
}

function isClickable(obj: unknown): obj is Clickable {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "onClick" in obj &&
    typeof (obj as Clickable).onClick === "function"
  );
}

function mapIntersections<T>(
  intersections: Intersection<Object3D<Object3DEventMap>>[]
) {
  return intersections.map((item) => {
    const { object, ...rest } = item;
    return { object: object as T, data: rest };
  });
}

class Loop {
  private updatables: Updateable[] = [];
  camera: Camera;
  renderer: WebGLRenderer;
  scene: Scene;
  maxInterval: number;
  fixedTimeInterval: number;
  isFixedTimeInterval: boolean;

  constructor(
    camera: PerspectiveCamera | Camera,
    scene: Scene,
    renderer: WebGLRenderer,
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
    hoverRaycaster = new Raycaster();
    hoverRaycaster.layers.set(Layers.HOVER);

    //Layer for clickable
    clickRaycaster = new Raycaster();
    clickRaycaster.layers.set(Layers.CLICK);

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

  addHoverable(obj: Hoverable) {
    obj.layers.enable(Layers.HOVER);
  }

  removeHoverable(obj: Hoverable) {
    obj.layers.disable(Layers.HOVER);
  }

  addClickable(obj: Clickable) {
    obj.layers.enable(Layers.CLICK);
  }

  removeClickable(obj: Clickable) {
    obj.layers.disable(Layers.CLICK);
  }

  private update() {
    const clockDelta = clock.getDelta();
    let delta = clamp(clockDelta, 0, this.maxInterval);
    if (this.isFixedTimeInterval) {
      delta = this.fixedTimeInterval;
    }

    for (const object of this.updatables) {
      object.update(delta);
    }
    this.onHover(mouse, this.camera, this.scene);
  }

  private onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private onHover(mouse: Vector2, camera: Camera, scene: Scene) {
    hoverRaycaster.setFromCamera(mouse, camera);
    const intersection = hoverRaycaster
      .intersectObjects(scene.children)
      .filter((item) => {
        return isHoverable(item.object);
      });
    const hoverables = mapIntersections<Hoverable>(intersection);
    if (hoverables.length > 0) {
      hoverables.forEach((item) => {
        item.object.onHover(item.data);
      });
    }
  }

  private onClick() {
    clickRaycaster.setFromCamera(mouse, this.camera);
    const intersection = clickRaycaster
      .intersectObjects(this.scene.children)
      .filter((item) => {
        return isClickable(item.object);
      });
    const clickables = mapIntersections<Clickable>(intersection);
    if (clickables.length > 0) {
      clickables.forEach((item) => {
        item.object.onClick(item.data);
      });
    }
  }
}

export { Loop };

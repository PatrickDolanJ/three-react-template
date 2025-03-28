import { WebGLRenderer } from "three";
class BasicRenderer extends WebGLRenderer {
  constructor(container: HTMLElement) {
    super({ antialias: true, precision: "highp" });
    container.append(this.domElement);
  }
}

export { BasicRenderer };

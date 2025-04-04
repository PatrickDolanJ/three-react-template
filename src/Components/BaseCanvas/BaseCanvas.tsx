import { World } from "../../World/World";
import { useEffect, useRef } from "react";

const BaseCanvas = () => {
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      const world = new World(container.current);
      world.start();
      return () => {
        world.stop();
      };
    }
  }, [container]);

  return <div ref={container} id="mainCanvasContainer" />;
};

export default BaseCanvas;

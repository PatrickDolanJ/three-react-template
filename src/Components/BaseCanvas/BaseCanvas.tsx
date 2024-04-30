import { World } from "../../World/World";
import { useEffect, useRef } from "react";

const BaseCanvas = () => {
  const container = useRef(null);
  const worldRef = useRef<World>();

  useEffect(() => {
    if (container.current) {
      const world = new World(container.current);
      world.start();
      worldRef.current = world;
    }
  }, []);

  return (
    <div>
      <div ref={container} id="mainCanvasContainer"></div>;
    </div>
  );
};

export default BaseCanvas;

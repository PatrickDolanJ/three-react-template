import { BufferGeometry, Line, Vector3 } from "three";
export class PlantGenerator {
  generatePoint(
    string: string,
    startPoint: Vector3,
    angle: number,
    length: number
  ) {
    let outputPoints: Vector3[] = [];
    let outputLines: Line[] = [];
    let stack: Vector3[] = [];
    let curPoint = new Vector3();

    Array.from(string).forEach((c) => {
      switch (c) {
        case "X": {
          const newPoint = createNewPoint(curPoint, length, angle);
          const newLine = new Line(
            new BufferGeometry().setFromPoints([curPoint, newPoint])
          );
          outputLines.push(newLine);
          outputPoints.push(newPoint);
          curPoint = newPoint;
          break;
        }
        case "F": {
          break;
        }
        case "-": {
          break;
        }
        case "+": {
          break;
        }
        case "[": {
          stack.push(curPoint);
          break;
        }
        case "]": {
          break;
        }
      }
    });
    return outputLines;
  }
}

function createNewPoint(previousPoint, length, rotationAngle) {
  // Calculate the displacement in x, y, and z directions
  const deltaX = length * Math.cos(rotationAngle);
  const deltaY = length * Math.sin(rotationAngle);
  const deltaZ = 0; // Assuming rotation is in the xy-plane, so no change in z

  // Create a new point by adding displacement to the previous point
  const newPoint = previousPoint
    .clone()
    .add(new Vector3(deltaX, deltaY, deltaZ));

  return newPoint;
}

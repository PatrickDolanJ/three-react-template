import { Vector3, BufferGeometry, Points } from "three";
import { LSystem } from "./Lindenmeyer/LindenMeyer";
import { PlantGenerator } from "./PlantGenerator/PlantGenerator";

const startPoint = new Vector3(0, 0, 0);
const iterations = 4;
const axiom = "X";
const angle = 25;
const rules = { X: "F+[[X]-X]-F[-FX]+X", F: "FF" };
const lsystem = new LSystem(axiom, rules, iterations);
const gen = new PlantGenerator();
const string = lsystem.generateString();
const points = gen.generatePoint(string, startPoint, angle);

const geo = new BufferGeometry();
geo.setFromPoints(points);

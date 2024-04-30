import { useEffect, useState } from "react";
import { LSystem } from "../../World/Components/Lindenmeyer/LindenMeyer";
import React from "react";

const rules = { X: "F+[[X]-X]-F[-FX]+X", F: "FF" };
const axiom = "X";
const iterations = 2;

const LindenMeyer = () => {
  const [string, setString] = useState("");
  useEffect(() => {
    const gen = new LSystem(axiom, rules, iterations);
    setString(gen.generateString());
    console.log(string);
  }, [string]);
  return <div>{string}</div>;
};

export default LindenMeyer;

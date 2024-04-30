export interface Rule {
  X: string;
  F: string;
  [key: string]: string;
}

export class LSystem {
  start: string;
  rules: Rule;
  string: string = "";
  iterations: number;
  constructor(start: string, rules: Rule, iterations: number) {
    this.start = start;
    this.rules = rules;
    this.iterations = iterations;
    this.string = this.start;
  }
  generateString() {
    let newString = "";
    for (let l = 0; l < this.iterations; l++) {
      for (let i = 0; i < this.string.length; i++) {
        let c = this.string[i];
        if (c in this.rules) {
          c = this.rules[c];
        }
        newString += c;
      }
      this.string = newString;
    }
    return this.string;
  }
}

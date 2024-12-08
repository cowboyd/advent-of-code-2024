import { text } from "./input.ts";

export function solution(input = text) {
  let lines = input.trim().split("\n");
  let equations = lines.map((line) => {
    let match = line.matchAll(/(\d+):\s+(.*$)/g);
    let [[, answertext, operandstext]] = match;
    let answer = Number(answertext);
    let operands = operandstext.split(/\s+/).map(Number);
    return createEquation(answer, operands);
  });
  return equations.filter((e) => e.solveable).reduce(
    (sum, e) => sum + e.answer,
    0,
  );
}

interface Equation {
  answer: number;
  solveable: boolean;
}

function createEquation(answer: number, operands: number[]): Equation {
  return {
    answer,
    get solveable(): boolean {
      let table = combinations(operands.length - 1);
      for (let operators of table) {
        if (compute(operands, operators) === answer) {
          return true;
        }
      }
      return false;
    },
  };
}

export type Operator = "*" | "+";

function combinations(size: number): Operator[][] {
  if (size === 1) {
    return [
      ["*"],
      ["+"],
    ];
  } else {
    let prev = combinations(size - 1);
    return prev.map((row) => (["*"] as Operator[]).concat(row)).concat(
      prev.map((row) => (["+"] as Operator[]).concat(row)),
    );
  }
}

export function compute(operands: number[], operators: Operator[]): number {
  let [initial, ...rest] = operands;
  return rest.reduce((total, operand, i) => {
    let operator = operators[i]!;
    if (operator === "*") {
      return total * operand;
    } else {
      return total + operand;
    }
  }, initial);
}

console.log(solution());

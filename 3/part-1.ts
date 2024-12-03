import { text } from "./input.ts";

export const exprs = [...scan(text)];

export const total = exprs.reduce(
  (total, expr) => total + (expr.a * expr.b),
  0,
);

type MultLiteral = {
  token: string;
  a: number;
  b: number;
};

function* scan(text: string): Iterable<MultLiteral> {
  let scanner = /mul\((\d+),(\d+)\)/g;
  let match = scanner.exec(text);
  while (match) {
    let [token, a, b] = match;
    yield {
      token,
      a: Number(a),
      b: Number(b),
    };
    match = scanner.exec(text);
  }
}

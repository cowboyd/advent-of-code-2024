import { text } from "./input.ts";

type Literal = MultLiteral | DoLiteral | DontLiteral;

type MultLiteral = {
  tag: "mul";
  token: string;
  a: number;
  b: number;
};

type DoLiteral = {
  tag: "do";
  token: "do()";
};

type DontLiteral = {
  tag: "dont";
  token: "don't()";
};

export const { total } = [...scan(text)].reduce((cxt, expr) => {
  if (expr.tag === "mul" && cxt.enabled) {
    return { enabled: true, total: cxt.total += expr.a * expr.b };
  } else if (expr.tag === "do") {
    return { ...cxt, enabled: true };
  } else if (expr.tag === "dont") {
    return { ...cxt, enabled: false };
  } else {
    return cxt;
  }
}, { enabled: true, total: 0 });

function* scan(text: string): Iterable<Literal> {
  let scanner = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
  let match = scanner.exec(text);
  while (match) {
    let [, token, a, b] = match;
    if (token.startsWith("mul")) {
      yield {
        tag: "mul",
        token,
        a: Number(a),
        b: Number(b),
      };
    } else if (token === "don't()") {
      yield { token, tag: "dont" };
    } else if (token === "do()") {
      yield { token, tag: "do" };
    }
    match = scanner.exec(text);
  }
}

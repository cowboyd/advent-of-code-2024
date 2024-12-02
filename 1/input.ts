let filename = new URL(import.meta.resolve("./input.txt")).pathname;

export const example = `
3   4
4   3
2   5
1   3
3   9
3   3`;

let text = Deno.readTextFileSync(filename);

export const lines = text.trim().split("\n").map((l) =>
  l.split(/\s+/).map(Number) as [number, number]
);

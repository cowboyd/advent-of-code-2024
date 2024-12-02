import { lines } from "./input.ts";

export let left = lines.map(([a]) => a);
export let right = lines.map(([, b]) => b);

left.sort();
right.sort();

let pairs: [number, number][] = left.map((a, i) => [a, right[i]]);

export let distance = pairs.reduce((total, [a, b]) => {
  return total + Math.abs(a - b);
}, 0);

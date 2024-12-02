import { left, right } from "./part-1.ts";

export let similarity = 0;

for (let a of left) {
  for (let b of right) {
    if (a === b) {
      similarity += a;
    }
  }
}

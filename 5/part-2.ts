import { isCorrectlyOrdered, updates, postcedents, middle } from "./part-1.ts";

let incorrect = updates.filter((up) => !isCorrectlyOrdered(up));

function fix(update: number[]): number[] {
  if (update.length <= 1) {
    return update;
  } else {
    let lastIdx = update.length - 1;
    let last = update[lastIdx];
    let start = update.slice(0, lastIdx);
    let x = postcedents.get(last);
    if (!x || x.intersection(new Set(start)).size === 0) {
      return fix(start).concat(last);
    }
    let swapIdx = update.findIndex(page => x.has(page));
    let extract = update[swapIdx];
    return fix(start.toSpliced(swapIdx, 1, last).concat(extract));
  }
}

export const solution = incorrect.map(fix).map(middle).reduce((sum, num) => sum + num);


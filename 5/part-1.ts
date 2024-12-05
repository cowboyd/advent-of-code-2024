import { assert } from "jsr:@std/assert";
import { text } from "./input.ts";

const [orderingText, updatesText] = text.split(/^\s*\n/gm)

const ordering = orderingText.trim().split("\n").map(line => line.split("|").map(Number));

export const updates = updatesText.trim().split("\n").map(line => line.split(",").map(Number));

assert(updates.every(up => (up.length % 2) !== 0));

export const postcedents = new Map<number, Set<number>>();

for (let [antecedent, postcedent] of ordering) {
  let bucket = postcedents.get(antecedent);
  if (!bucket) {
    bucket = new Set([postcedent]);
    postcedents.set(antecedent, bucket)
  } else {
    bucket.add(postcedent);
  }
}

export function isCorrectlyOrdered(update: number[]): boolean {
  for (let i = 0; i < update.length; i++) {
    let postcedent = update[i];
    let forbidden = postcedents.get(postcedent)!;
    let preceding = new Set(update.slice(0,i));
    if (!forbidden) {
      continue;
    }
    if (preceding.intersection(forbidden).size !== 0) {
      return false;
    }
  }
  return true;
}


export function middle(update: number[]): number {
  let mid = update[Math.floor(update.length / 2)];
  assert(typeof mid !== 'undefined');
  return mid;
}

export const solution = updates.filter(isCorrectlyOrdered).map(middle).reduce((sum, num)=> sum + num)




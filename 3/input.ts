export const text = Deno.readTextFileSync(
  new URL(import.meta.resolve("./input.txt")).pathname,
);
//export const text = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

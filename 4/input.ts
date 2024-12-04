export const text = Deno.readTextFileSync(
  new URL(import.meta.resolve("./input.txt")).pathname,
);


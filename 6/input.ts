export const input = Deno.readTextFileSync(
  new URL(import.meta.resolve("./input.txt")).pathname,
);

export const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

//export const text = example;
export const text = input;

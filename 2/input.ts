const filename = new URL(import.meta.resolve("./input.txt")).pathname;

const text = Deno.readTextFileSync(filename);

// const text = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`

export const reports: number[][] = text.trim().split("\n").map(line => line.trim().split(/\s+/).map(Number));

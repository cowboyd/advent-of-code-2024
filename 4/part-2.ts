import { text } from "./input.ts";

import { Cell, find, Grid } from "./part-1.ts";

function isXMAS(cell: Cell): boolean {
  let { northeast, southeast, southwest, northwest } = cell;

  if (!northeast || !southeast || !southwest || !northwest) {
    return false;
  } else {
    return (find(northeast, "southwest", "MAS") ||
      find(southwest, "northeast", "MAS")) &&
      (find(northwest, "southeast", "MAS") ||
        find(southeast, "northwest", "MAS"));
  }
}

let grid = new Grid(text.trim().split("\n"));

export let total = 0;

for (let top = 0; top < grid.rows.length; top++) {
  for (let left = 0; left < grid.rows[top].length; left++) {
    let cell = grid.at(top, left)!;
    if (isXMAS(cell)) {
      total++;
    }
  }
}

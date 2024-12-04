import { text } from "./input.ts";
export const directions = [
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
  "northwest",
] as const;

export type Direction = typeof directions[number];

export class Grid {
  constructor(public rows: string[]) {}

  get height(): number {
    return this.rows.length;
  }

  get width(): number {
    return this.rows[0].length;
  }

  at(top: number, left: number): Cell | undefined {
    let row = this.rows[top];
    if (row) {
      let value = row[left];
      if (typeof value !== "undefined") {
        return new Cell(this, top, left);
      }
    }
  }
}

export class Cell {
  constructor(private grid: Grid, public top: number, public left: number) {}

  get value(): string {
    return this.grid.rows[this.top][this.left];
  }
  get north(): Cell | undefined {
    return this.grid.at(this.top - 1, this.left);
  }
  get northeast(): Cell | undefined {
    return this.grid.at(this.top - 1, this.left + 1);
  }
  get east(): Cell | undefined {
    return this.grid.at(this.top, this.left + 1);
  }
  get southeast(): Cell | undefined {
    return this.grid.at(this.top + 1, this.left + 1);
  }
  get south(): Cell | undefined {
    return this.grid.at(this.top + 1, this.left);
  }
  get southwest(): Cell | undefined {
    return this.grid.at(this.top + 1, this.left - 1);
  }
  get west(): Cell | undefined {
    return this.grid.at(this.top, this.left - 1);
  }
  get northwest(): Cell | undefined {
    return this.grid.at(this.top - 1, this.left - 1);
  }
}

let grid = new Grid(text.trim().split("\n"));

export let total = 0;

for (let top = 0; top < grid.rows.length; top++) {
  for (let left = 0; left < grid.rows[top].length; left++) {
    total += xmasesAt(grid, top, left);
  }
}

function xmasesAt(grid: Grid, top: number, left: number): number {
  let start = grid.at(top, left)!;
  return directions.reduce(
    (total, direction) => {
      if (find(start, direction, "XMAS")) {
        return total + 1;
      } else {
        return total;
      }
    },
    0,
  );
}

export function find(
  cell: Cell,
  direction: typeof directions[number],
  remainder: string,
): boolean {
  if (!remainder.startsWith(cell.value)) {
    return false;
  } else if (remainder.length === 1) {
    return true;
  } else {
    let next = cell[direction];
    return next ? find(next, direction, remainder.slice(1)) : false;
  }
}

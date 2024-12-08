import { text } from "./input.ts";

export const directions = [
  "north",
  "east",
  "south",
  "west",
] as const;

export type Direction = typeof directions[number];

export function turnRight(current: Direction): Direction {
  switch (current) {
    case "north":
      return "east";
    case "east":
      return "south";
    case "south":
      return "west";
    case "west":
      return "north";  
  }
}

export class Board {
  guard: Square;
  visited = new Set<string>();
  constructor(public rows: string[][]) {
    let guard = this.find(square => square.value === "^");
    if (!guard) {
      throw new Error('no starting position found for guard' + `\n${this.print()}`);
    }
    this.guard = guard;
  }

  clone() {
    return new Board(this.rows.map(row => row.map(char => char)));
  }
  
  print(): string {
    return this.rows.map(row => row.join("")).join("\n");
  }

  *squares(): IterableIterator<Square> {
    for (let top = 0; top < this.rows.length; top++) {
      let row = this.rows[top];
      for (let left = 0; left < row.length; left++) {
	yield this.at(top, left)!;	
      }
    }
  }

  visit(square: Square, direction: Direction | "unknown" = "unknown"): void {
    this.visited.add(`(${square.top},${square.left}):${direction}`);
    this.rows[square.top][square.left] = "X";
  }

  hasPassedThroughInSameDirection(square: Square, direction: Direction): boolean {
    let { top, left } = square;
    return this.visited.has(`(${top},${left}):${direction}`);
  }

  find(predicate: (square: Square) => boolean): Square | undefined {
    for (let square of this.squares()) {
      if (predicate(square)) {
	return square;
      }
    }
    return undefined;
  }

  at(top: number, left: number): Square | undefined {
    let row = this.rows[top];
    if (row) {
      let value = row[left];
      if (typeof value !== "undefined") {
        return new Square(this, top, left);
      }
    }
  }
}

export class Square {
  constructor(public board: Board, public top: number, public left: number) {}

  eq(other: Square) {
    return this.top === other.top && this.left === other.left;
  }
  
  get value(): string {
    return this.board.rows[this.top][this.left];
  }

  get isObstacle(): boolean {
    return this.value === "#";
  }

  get isClear(): boolean {
    return !this.isObstacle;
  }
  
  get north(): Square | undefined {
    return this.board.at(this.top - 1, this.left);
  }
  get east(): Square | undefined {
    return this.board.at(this.top, this.left + 1);
  }
  get south(): Square | undefined {
    return this.board.at(this.top + 1, this.left);
  }
  get west(): Square | undefined {
    return this.board.at(this.top, this.left - 1);
  }
}

export class Guard {
  public direction: Direction = "north";
  constructor(public square: Square) {}
  get ahead(): Square | undefined {
    return this.square[this.direction];
  }
}

export function solution(input = text): number {
  let visited = 1;
  let board = new Board(input.trim().split("\n").map(s => s.split("")));
  let guard = new Guard(board.guard);
  
  while (true) {
    board.visit(guard.square);
    if (!guard.ahead) {
      return board.visited.size;
    } else if (guard.ahead.isObstacle) {
      guard.direction = turnRight(guard.direction);
    } else {
      guard.square = guard.ahead;
      visited++
    }
  }
}

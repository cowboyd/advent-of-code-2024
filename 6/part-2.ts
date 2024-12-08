import { text } from "./input.ts";
import { Board, Guard, Square, turnRight } from "./part-1.ts";

export function solution(input = text): number {
  let board = new Board(input.trim().split("\n").map((s) => s.split("")));

  return [...board.squares()].filter(causesLoop(board)).length;
}

function causesLoop(board: Board): (square: Square) => boolean { 
  return (square) => {
    if (square.eq(board.guard)) {
      return false;
    }
    
    let test = board.clone();
    test.rows[square.top][square.left] = "#";

    let guard = new Guard(test.guard);

    while (true) {
      test.visit(guard.square, guard.direction);
      if (!guard.ahead) {
        return false;
      } else if (test.hasPassedThroughInSameDirection(guard.ahead, guard.direction)) {
	return true;
      } else if (guard.ahead.isObstacle) {
        guard.direction = turnRight(guard.direction);
      } else {
        guard.square = guard.ahead;
      }
    }
  };
}

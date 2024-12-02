import { reports } from "./input.ts";

export type Report = number[];

export const safe = reports.filter(isSafe);

export function stepsOf(report: Report): Step[] {
  let steps = report.map((level, i) => [level, report[i + 1]]);
  return steps.slice(0, -1) as Step[];
}

export type Step = [number, number];

export function isSafe(report: Report): boolean {
  let steps = stepsOf(report);
  return steps.every(withinThree) &&
    (steps.every(increasing) || steps.every(decreasing));
}

function withinThree([level, next]: Step): boolean {
  return Math.abs(level - next) <= 3;
}

function increasing([level, next]: Step): boolean {
  return next < level;
}

function decreasing([level, next]: Step): boolean {
  return next > level;
}

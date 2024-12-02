import { reports } from "./input.ts";
import { isSafe, type Report } from "./part-1.ts";

export type ReportP = (report: Report) => boolean;

export const safe = reports.filter(dampener(isSafe));

function dampener(pred: ReportP): ReportP {
  return (report) => {
    for (let i = report.length; i >= 0; i--) {
      let dampened = report.toSpliced(i, 1);
      if (pred(dampened)) {
	return true;
      }
    }
    return false;
  }
}

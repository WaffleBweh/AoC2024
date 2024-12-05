import { readFile } from "fs/promises";
import { report } from "process";

// Returns true if the value differ by at least one and at most three (default behavior).
function isInThreshold(a, b) {
  const minThreshold = 1; // Could be moved outside of function
  const maxThreshold = 3; // Could be moved outside of function
  const difference = Math.abs(a - b);

  const isAboveMinThreshold = difference >= minThreshold;
  const isBelowMaxThreshold = difference <= maxThreshold;

  return isAboveMinThreshold && isBelowMaxThreshold;
}

// Checks if a WHOLE list is of numbers is ascending or descending
function isAscendingOrDescending(list) {
  if (list.length <= 1) {
    throw new Error("List too short (1 or more)");
  }

  const a = list[0];
  const b = list[1];
  const ascending = a < b; // true = ascending, false = descending
  let isValid = true;

  for (let i = 1; i < list.length - 1; i++) {
    const previous = list[i - 1];
    const current = list[i];
    const next = list[i + 1];

    if (ascending) {
      isValid = previous < current && current < next;
    } else {
      isValid = previous > current && current > next;
    }

    if (!isValid) return false; // If it's not ascending or descending, return false
  }

  return true; // No issues, it's true
}

// Returns 1 if the report is safe and 0 if it is not
// A report is safe if both are true :
// - The levels are either all increasing or all decreasing.
// - Any two adjacent levels differ by at least one and at most three.
function isSafe(report) {
  const isAscendOrDescend = isAscendingOrDescending(report); // if ascending OR descending

  for (let i = 1; i < report.length - 1; i++) {
    // Sliding window approach (we check a current number and its two neighbors at a time)
    const previous = report[i - 1];
    const current = report[i];
    const next = report[i + 1];

    // Define booleans for each requirements
    const isInMargin =
      isInThreshold(previous, current) && isInThreshold(current, next);
    const isInvalid = !isAscendOrDescend || !isInMargin;

    // If we encounter an issue (not ascending, descending or in margin)
    // we break out immediatly and return false
    if (isInvalid) {
      return false;
    }
  }

  // Encountered no issues, report is safe !
  return true;
}

const fileContent = (await readFile("day_2/2/input.txt", "utf-8")).split("\n");
const reports = [];

fileContent.forEach((line, i) => {
  reports.push([...line.split(" ")].map((elem) => Number(elem)));
});

let numbersOfSafeReports = 0;
reports.forEach((report) => {
  if (isSafe(report)) {
    numbersOfSafeReports++;
  } else { // We are allowed to remove one number of our set if it is considered not safe to check if it is really safe
    // Check if its really safe by retesting and removing a number each time on each report
    for (let i = 0; i < report.length; i++) {
      const reportWithoutOneElement = report.filter((_, index) => i !== index);
      if (isSafe(reportWithoutOneElement)) {
        numbersOfSafeReports++;
        break;
      }
    }
  }
});

console.log("Number of safe reports : ", numbersOfSafeReports);

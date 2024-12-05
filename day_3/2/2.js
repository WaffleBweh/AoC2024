import { readFile } from "fs/promises";
const inputStrings = (await readFile("day_3/2/input.txt", "utf-8")).split("\n");

const dontCmd = 'don\'t()'
const doCmd = 'do()'

// c.f. regex tester to check control groups 
// https://regex101.com/r/0TMug1/1
const re = /(mul\((\d+),(\d+)\))|(do\(\))|don't\(\)/g;
let total = 0;
let shouldSkip = false;

inputStrings.forEach((str) => {
  for (const match of str.matchAll(re)){
    if (match[0] === doCmd) shouldSkip = false
    if (match[0] === dontCmd) shouldSkip = true
    if (shouldSkip) continue

    // We didn't skip, check our capture groups for results
    const a = match[2] ? match[2] : 0
    const b = match[3] ? match[3] : 0
    total += a*b;
  }

});

console.log("The total is:", total);

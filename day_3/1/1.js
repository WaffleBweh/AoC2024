import { readFile } from "fs/promises";
const inputStrings = (await readFile("day_3/1/input.txt", "utf-8")).split("\n");

const re = /mul\((\d+),(\d+)\)/g;
let total = 0;

inputStrings.forEach((str) => {
  console.log(str);
  const matches = [...str.matchAll(re)];

  matches.forEach((match) => {
    const a = match[1];
    const b = match[2];
    total += a*b;
  });
});

console.log("The total is:", total);

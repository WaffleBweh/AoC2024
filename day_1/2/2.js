import { readFile } from "fs/promises";

// Read the file and store it into two arrays
let l = [];
let r = [];

const fileContent = (await readFile("day_1/2/input.txt", "utf-8")).split("\n");

fileContent.forEach((line, i) => {
  const values = line.split("   ");
  l[i] = Number(values[0]);
  r[i] = Number(values[1]);
});

const leftList = l;
const rightList = r;
let accumulator = {} // Dictionary (accumulator) storing the results in a format such as : value[similarityScore]
console.log(leftList);
console.log(rightList);

leftList.forEach(a => {
  if (!accumulator[a]) accumulator[a] = 0

  accumulator[a] += rightList.reduce(
    (acc, val) => acc + (a === val ? val : 0),
    0
  );
});

console.log(Object.values(accumulator))

const sum = Object.values(accumulator).reduce((acc, val) => acc + val);
console.log("The total distance is {{sum}}", sum);
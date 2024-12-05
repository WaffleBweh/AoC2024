import { readFile } from "fs/promises";

// Returns the distance between two integers
function distance(a, b) {
  return Math.abs(a - b);
}


// Read the file and store it into two arrays
let l = []
let r = []
const fileContent = (await readFile('day_1/1/input.txt', 'utf-8')).split('\n');

fileContent.forEach((line, i) => {  
  const values = line.split('   ');
  l[i] = Number(values[0])
  r[i] = Number(values[1])
});

// Sort our arrays

const leftList = l.sort();
const rightList = r.sort();

console.log(leftList)
console.log(rightList)

// Create an array filled with the distances from each sorted arrays
const distances = Array(leftList.length)
  .fill(0)
  .map((_, i) => distance(leftList[i], rightList[i]));

const distanceSum = distances.reduce((partialSum, nb) => partialSum + nb);

console.log("The total distance is ", distanceSum);

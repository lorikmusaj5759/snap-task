// Filename: ComplexCode.js

/**
 * This code performs a complex operation on an array of numbers and outputs the result.
 * Its main purpose is to showcase how to manipulate and analyze large datasets.
 */

// Generate an array of random numbers
const generateRandomArray = () => {
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

// Function to calculate the sum of an array
const calculateSum = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

// Function to filter out even numbers from an array
const filterEvenNumbers = (arr) => {
  const filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      filteredArr.push(arr[i]);
    }
  }
  return filteredArr;
};

// Function to find the maximum value in an array
const findMaxValue = (arr) => {
  let max = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

// Main code execution
console.log("Generating random array...");
const data = generateRandomArray();

console.log("Calculating sum of array...");
const sum = calculateSum(data);
console.log(`Sum of array: ${sum}`);

console.log("Filtering even numbers...");
const filteredData = filterEvenNumbers(data);
console.log("Filtered array: ", filteredData);

console.log("Finding maximum value...");
const maxValue = findMaxValue(data);
console.log(`Maximum value: ${maxValue}`);

console.log("Complex code execution complete.");
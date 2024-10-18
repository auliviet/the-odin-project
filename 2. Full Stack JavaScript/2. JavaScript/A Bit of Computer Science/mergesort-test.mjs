import mergesort from "./mergesort.mjs";

let unsortedArray1 = [3, 2, 1, 13, 8, 5, 0, 1];
console.log("Unsorted array 1: ", unsortedArray1);
console.log("Sorted array 1 with Merge Sort: ", mergesort(unsortedArray1));
console.log("");

let unsortedArray2 = [105, 79, 100, 110];
console.log("Unsorted array 2: ", unsortedArray2);
console.log("Sorted array 2 with Merge Sort: ", mergesort(unsortedArray2));
console.log("");

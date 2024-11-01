import knightMoves from "./knight.mjs";

console.log("Start = [0,0] / End = [3,3]");
knightMoves([0, 0], [3, 3]);
console.log("");

console.log("Start = [3,3] / End = [0,0]");
knightMoves([3, 3], [0, 0]);
console.log("");

console.log("Start = [0,0] / End = [7,7]");
knightMoves([0, 0], [7, 7]);
console.log("");

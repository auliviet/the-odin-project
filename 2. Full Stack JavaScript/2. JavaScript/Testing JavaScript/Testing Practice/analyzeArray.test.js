import analyzeArray from "./analyzeArray";

let testArray = [1, 8, 3, 4, 2, 6];

test("analyzeArray: [1,8,3,4,2,6] => average: 4", () => {
  expect(analyzeArray(testArray).average).toBe(4);
});

test("analyzeArray: [1,8,3,4,2,6] => min: 1", () => {
  expect(analyzeArray(testArray).min).toBe(1);
});

test("analyzeArray: [1,8,3,4,2,6] => max: 8", () => {
  expect(analyzeArray(testArray).max).toBe(8);
});

test("analyzeArray: [1,8,3,4,2,6] => length: 6", () => {
  expect(analyzeArray(testArray).length).toBe(6);
});

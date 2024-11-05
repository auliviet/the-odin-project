import { calculator } from "./calculator";

// Addition
test("Add: 2 + 2 = 4", () => {
  expect(calculator.add(2, 2)).toBe(4);
});

test("Add: -2 + 2 = 0", () => {
  expect(calculator.add(-2, 2)).toBe(0);
});

// Substraction
test("Substract: 3 - 2 = 0", () => {
  expect(calculator.substract(3, 2)).toBe(1);
});

test("Substract: -2 - 5 = -7", () => {
  expect(calculator.substract(-2, 5)).toBe(-7);
});

test("Substract: -2 - (-5) = 3", () => {
  expect(calculator.substract(-2, -5)).toBe(3);
});

// Multiplication
test("Multiply: 2 * 5 = 10", () => {
  expect(calculator.multiply(2, 5)).toBe(10);
});

test("Multiply: -4 * 5 = -20", () => {
  expect(calculator.multiply(-4, 5)).toBe(-20);
});

test("Multiply: -3 * -3 = 9", () => {
  expect(calculator.multiply(-3, -3)).toBe(9);
});

test("Multiply: 3 * 0 = 0", () => {
  expect(calculator.multiply(3, 0)).toBe(0);
});

// Division
test("Divide: 6 / 3 = 2", () => {
  expect(calculator.divide(6, 3)).toBe(2);
});

test("Divide: 6 / 4 = 1.5", () => {
  expect(calculator.divide(6, 4)).toBe(1.5);
});

test("Divide: 6 / -2 = -3", () => {
  expect(calculator.divide(6, 4)).toBe(1.5);
});

test("Divide: 6 / 0 = NaN", () => {
  expect(calculator.divide(6, 4)).toBe(1.5);
});

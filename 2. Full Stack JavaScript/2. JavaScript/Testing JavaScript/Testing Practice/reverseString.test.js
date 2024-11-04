import reverseString from "./reverseString";

test("Reverse string 'hello' => 'olleh'", () => {
  expect(reverseString("hello")).toMatch("olleh");
});

test("Reverse string 'Hello' => 'olleH'", () => {
  expect(reverseString("Hello")).toMatch("olleH");
});

test("Reverse string 'Hello World' => 'dlroW olleH'", () => {
  expect(reverseString("Hello World")).toMatch("dlroW olleH");
});

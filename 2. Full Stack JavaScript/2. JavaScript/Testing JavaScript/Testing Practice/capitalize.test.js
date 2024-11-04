import capitalize from "./capitalize";

test("Capitalize 'hello' => 'Hello'", () => {
  expect(capitalize("hello")).toMatch("Hello");
});

test("Capitalize 'hello world' => 'Hello world'", () => {
  expect(capitalize("hello world")).toMatch("Hello world");
});

test("Capitalize 'GOODBYE' => 'GOODBYE'", () => {
  expect(capitalize("GOODBYE")).toMatch("GOODBYE");
});

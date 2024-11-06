import caesarCipher from "./caesar";

test("Caesar cipher: 'hello', 3 = 'khoor", () => {
  expect(caesarCipher("hello", 3)).toMatch("khoor");
});

test("Caesar cipher: 'xyz', 3 = 'abc", () => {
  expect(caesarCipher("xyz", 3)).toMatch("abc");
});

test("Caesar cipher: 'HeLLo', 3 = 'KhOOr", () => {
  expect(caesarCipher("HeLLo", 3)).toMatch("KhOOr");
});

test("Caesar cipher: 'Hello, World!', 3 = 'Khoor, Zruog!", () => {
  expect(caesarCipher("Hello, World!", 3)).toMatch("Khoor, Zruog!");
});

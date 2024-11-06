export default function caesarCipher(string, factor) {
  let cipher = "";

  const lowerCase = Array.from("abcdefghijklmnopqrstuvwxyz");
  const upperCase = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  string.split("").forEach((char) => {
    if (lowerCase.indexOf(char) >= 0) {
      let index = lowerCase.indexOf(char);
      cipher += lowerCase[(index + factor) % lowerCase.length];
    } else if (upperCase.indexOf(char) >= 0) {
      let index = upperCase.indexOf(char);
      cipher += upperCase[(index + factor) % upperCase.length];
    } else {
      cipher += char;
    }
  });

  return cipher;
}

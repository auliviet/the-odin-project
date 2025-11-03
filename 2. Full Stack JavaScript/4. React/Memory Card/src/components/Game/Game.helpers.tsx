import type { Character } from "@/helpers/interfaces";

// Randomize the orders of the characters displayed on screen.
export function shuffleCharacters(characters: Character[]) {
  const shuffledArray = [...characters];

  // Add a random number to each character
  shuffledArray.forEach((item) => (item.position = Math.random()));

  // Sort characters based on this random number
  return shuffledArray.sort((a, b) => a.position - b.position);
}

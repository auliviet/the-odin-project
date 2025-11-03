import type { Character } from "./interfaces";

export async function fetchCharacters(
  characterIds: number[]
): Promise<Character[]> {
  // Call the Rick and Morty API for a selected number of character IDs.
  // https://rickandmortyapi.com/documentation/#get-multiple-characters
  const requestURL = `https://rickandmortyapi.com/api/character/${characterIds.toString()}`;

  const response = await fetch(requestURL);
  if (!response.ok) {
    throw new Error(
      `Response status: ${response.status.toString()} ${response.statusText}`
    );
  }

  const rawData = (await response.json()) as Character[];
  // Ensure the data is in an array to iterate over
  const characters: Character[] = Array.isArray(rawData) ? rawData : [rawData];

  // Return only the fields we need from the API
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    image: character.image,
    position: character.id,
  }));
}

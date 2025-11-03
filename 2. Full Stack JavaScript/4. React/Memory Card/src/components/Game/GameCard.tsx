import type { Character } from "@/helpers/interfaces";

export default function GameCard({
  character,
  handleSelection,
}: {
  character: Character;
  handleSelection: Function;
}) {
  return (
    <button onClick={() => handleSelection(character.id)}>
      <img src={character.image} alt={character.name} />
    </button>
  );
}

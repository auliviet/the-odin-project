import type { Character } from "@/helpers/interfaces";
import GameCard from "./GameCard";

export default function GameCards({
  characters,
  score,
  handleSelection,
}: {
  characters: Character[];
  score: number;
  handleSelection: Function;
}) {
  return (
    <section>
      {characters.map((character) => (
        <GameCard
          key={character.id}
          character={character}
          handleSelection={handleSelection}
        />
      ))}

      <p className="score-section">
        Your score: <span className="score">{score}</span>
      </p>
    </section>
  );
}

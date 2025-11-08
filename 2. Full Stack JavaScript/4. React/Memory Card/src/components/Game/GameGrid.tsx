import type { Character } from "@/helpers/interfaces";
import GameCard from "./GameCard";

import classes from "./GameGrid.module.css";

export default function GameGrid({
  characters,
  handleSelection,
}: {
  characters: Character[];
  handleSelection: Function;
}) {
  return (
    <section className={classes.gridWrapper}>
      <div className={classes.cardsGrid}>
        {characters.map((character) => (
          <GameCard
            key={crypto.randomUUID()}
            character={character}
            handleSelection={handleSelection}
          />
        ))}
      </div>
    </section>
  );
}

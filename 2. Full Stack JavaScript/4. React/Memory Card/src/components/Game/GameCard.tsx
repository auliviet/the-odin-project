import type { Character } from "@/helpers/interfaces";
import classes from "./GameCard.module.css";

export default function GameCard({
  character,
  handleSelection,
}: {
  character: Character;
  handleSelection: Function;
}) {
  function randomDuration(min: number, max: number) {
    const duration = Math.floor(Math.random() * (max - min)) + min;
    return `${duration}ms`;
  }
  return (
    <button
      className={classes.card}
      onClick={() => handleSelection(character.id)}
    >
      <div
        className={classes.cardWrapper}
        style={
          { "--duration": randomDuration(600, 1000) } as React.CSSProperties
        }
      >
        <div className={classes.cardFront}>
          <img src={character.image} alt={character.name} />
        </div>
        <div className={classes.cardBack}></div>
      </div>
    </button>
  );
}

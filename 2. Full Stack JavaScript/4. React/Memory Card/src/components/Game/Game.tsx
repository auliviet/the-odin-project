import type { Character, Status } from "@/helpers/interfaces";
import { useState } from "react";
import { shuffleCharacters } from "./Game.helpers";
import GameGrid from "./GameGrid";
import EndGame from "./EndGame";
import Header from "./Header";

import classes from "./Game.module.css";
import playSound from "@/helpers/playSound";

export default function Game({
  characters,
  status,
  setStatus,
}: {
  characters: Character[];
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}) {
  const [playedIDs, setPlayedIDs] = useState<number[]>([]);
  const [maxScore, setMaxScore] = useState(0);

  const shuffledCharacters = shuffleCharacters(characters);

  // Handler to select a character.
  function handleSelection(selectedID: number) {
    const nextPlayedIDs = [...playedIDs];
    nextPlayedIDs.push(selectedID);

    if (playedIDs.find((id) => id === selectedID)) {
      // Verify if the character has already been selected and return game over.
      playSound("lost");
      setStatus("lost");
    } else {
      // Update the max score
      nextPlayedIDs.length > maxScore && setMaxScore(nextPlayedIDs.length);

      // Verify if the user reached the max score an return game won.
      if (characters.length === nextPlayedIDs.length) {
        playSound("won");
        setStatus("won");
      }

      // Add the character to the list of playedIDs
      playSound("click");
      setPlayedIDs(nextPlayedIDs);
    }
  }

  // Handler to restart the game
  function handleRestart() {
    playSound("restart");

    // Clear the playedIDs state
    const nextPlayedIDs: number[] = [];
    setPlayedIDs(nextPlayedIDs);

    // Change the status state
    setStatus("playing");
  }

  return (
    <section className={classes.game}>
      <Header />
      {status === "playing" && (
        <>
          <GameGrid
            characters={shuffledCharacters}
            handleSelection={handleSelection}
          />
          <footer className={classes.scoreSection}>
            Your score:{" "}
            <span className={classes.score}>{playedIDs.length}</span>
          </footer>
        </>
      )}
      {(status === "won" || status === "lost") && (
        <EndGame
          score={playedIDs.length}
          maxScore={maxScore}
          status={status}
          handleRestart={handleRestart}
        />
      )}
    </section>
  );
}

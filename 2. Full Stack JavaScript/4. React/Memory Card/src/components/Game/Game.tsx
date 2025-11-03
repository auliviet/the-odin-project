import type { Character, Status } from "@/helpers/interfaces";
import { useState } from "react";
import { shuffleCharacters } from "./Game.helpers";
import GameCards from "./GameCards";
import EndGame from "./EndGame";
import Header from "./Header";

export default function Game({
  characters,
  gameStatus,
  setGameStatus,
}: {
  characters: Character[];
  gameStatus: Status;
  setGameStatus: React.Dispatch<React.SetStateAction<Status>>;
}) {
  const [playedIDs, setPlayedIDs] = useState<number[]>([]);
  const [maxScore, setMaxScore] = useState(0);

  const shuffledCharacters = shuffleCharacters(characters);

  // DEBUG
  console.log({ maxScore });
  console.log(playedIDs.length);
  // END DEBUG

  // Handler to select a character.
  function handleSelection(selectedID: number) {
    // DEBUG
    console.log({ selectedID });
    // END DEBUG

    const nextPlayedIDs = [...playedIDs];
    nextPlayedIDs.push(selectedID);

    if (playedIDs.find((id) => id === selectedID)) {
      // Verify if the character has already been selected and return game over.
      setGameStatus("lost");
    } else {
      // Update the max score
      nextPlayedIDs.length > maxScore && setMaxScore(nextPlayedIDs.length);

      // Verify if the user reached the max score an return game won.
      if (characters.length === nextPlayedIDs.length) {
        setGameStatus("won");
      }

      // Add the character to the list of playedIDs
      setPlayedIDs(nextPlayedIDs);
    }
  }

  function handleRestart() {
    console.log("RESTART");
    const nextPlayedIDs: number[] = [];
    setPlayedIDs(nextPlayedIDs);
    setGameStatus("playing");
  }

  return (
    <section>
      <Header />
      {gameStatus === "playing" && (
        <GameCards
          characters={shuffledCharacters}
          score={playedIDs.length}
          handleSelection={handleSelection}
        />
      )}
      {(gameStatus === "won" || gameStatus === "lost") && (
        <EndGame
          score={playedIDs.length}
          maxScore={maxScore}
          gameStatus={gameStatus}
          handleRestart={handleRestart}
        />
      )}
    </section>
  );
}

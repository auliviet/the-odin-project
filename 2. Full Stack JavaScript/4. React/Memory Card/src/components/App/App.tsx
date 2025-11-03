import { useEffect, useState } from "react";
import { fetchCharacters } from "@/helpers/fetch";
import { CHARACTER_IDS } from "@/constants";

import { type Status, type Character } from "@/helpers/interfaces";
import Game from "@/components/Game";
import Welcome from "../Welcome";

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [gameStatus, setGameStatus] = useState<Status>("start");

  useEffect(() => {
    // Pre-load the character on the start screen
    let ignore = false;

    fetchCharacters(CHARACTER_IDS)
      .then((characters) => {
        if (!ignore) {
          setCharacters(characters);
        }
      })
      .catch((error: unknown) => {
        console.error(`Failed to fetch characters: `, error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {gameStatus === "start" && <Welcome setGameStatus={setGameStatus} />}
      {gameStatus !== "start" && (
        <Game
          characters={characters}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      )}
    </>
  );
}

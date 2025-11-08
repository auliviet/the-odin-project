import { useEffect, useState } from "react";
import { fetchCharacters } from "@/helpers/fetch";
import { CHARACTER_IDS } from "@/constants";

import { type Status, type Character } from "@/helpers/interfaces";
import Game from "@/components/Game";
import Welcome from "../Welcome";

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [status, setStatus] = useState<Status>("start");

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
      {status === "start" && <Welcome setStatus={setStatus} />}
      {status !== "start" && (
        <Game characters={characters} status={status} setStatus={setStatus} />
      )}
    </>
  );
}

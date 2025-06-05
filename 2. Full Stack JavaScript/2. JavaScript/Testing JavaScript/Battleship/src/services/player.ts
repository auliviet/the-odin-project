import { Gameboard } from "./gameboard";

type PlayerType = "computer" | "real";

/** Class representing a player for the game. */
export default class Player {
  constructor(
    public name: string = "computer",
    public gameboard = new Gameboard(),
  ) {}

  /** Get the type of the payer. Determines if the player is a "computer" or a "real" player based on the name.
   */
  get type(): PlayerType {
    return this.name === "computer" ? "computer" : "real";
  }
}

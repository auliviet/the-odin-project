import { Gameboard } from "./gameboard";

/** Class representing a player for the game. */
export default class Player {
  #TYPES = ["computer", "real"];

  /** Create a player.
   * @param {string} name - The name of the player (default is "computer"). This name is used to distinguish between a computer player and a real player.
   */
  constructor(name = "computer") {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  /** Get the type of the player. Determines if the player is a "computer" or a "real" player based on the name.
   * @returns {string} "computer" if the player's name is "computer", otherwise "real".
   */
  get type() {
    return this.name === this.#TYPES[0] ? this.#TYPES[0] : this.#TYPES[1];
  }
}

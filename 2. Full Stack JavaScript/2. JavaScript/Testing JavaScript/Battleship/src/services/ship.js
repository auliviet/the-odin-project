/** Class representing a ship for the game. */
export default class Ship {
  /**
   * Create a ship.
   * @param {string} name - The name of the ship (default is "placeholderShip").
   * @param {number} length - The length of the ship (default is 1, must be a positive number).
   */
  constructor(name = "placeholderShip", length = 1) {
    this.name = name;
    this.length = length > 0 ? length : 1;
    this.hits = 0;
  }

  /** Increment the number of hits of the ship, until it reaches its length. This method returns true if the ship is hit (i.e., the hit count is incremented), and false if the ship has already been sunk (i.e., the hit count is equal to the ship's length).
   * @returns {boolean} True if the ship is hit, false otherwise.
   */
  hit() {
    if (this.hits < this.length) {
      this.hits++;
      return true;
    }

    return false;
  }

  /** Calculates whether a ship is considered sunk based on its length and the number of hits it has received. A ship is considered sunk if the number of hits equals its length.
   * @returns {boolean} True if the ship is sunk, false otherwise.
   */
  isSunk() {
    if (this.hits === this.length) {
      return true;
    }

    return false;
  }
}

/** Class representing a ship for the game. */
export default class Ship {
  constructor(
    public name = "placeholderShip",
    public length = 1,
    private hits = 0,
  ) {
    this.length = length > 0 ? length : 1;
  }

  /** Increment the number of hits of the ship, until it reaches its length. This method returns true if the ship is hit (i.e., the hit count is incremented), and false if the ship has already been sunk (i.e., the hit count is equal to the ship's length).
   */
  hit(): boolean {
    if (this.hits < this.length) {
      this.hits++;
      return true;
    }

    return false;
  }

  /** Calculates whether a ship is considered sunk based on its length and the number of hits it has received. A ship is considered sunk if the number of hits equals its length.
   */
  isSunk(): boolean {
    if (this.hits === this.length) {
      return true;
    }

    return false;
  }
}

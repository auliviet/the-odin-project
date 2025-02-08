import Player from "./player";

/** Class representing an AI player for the game. */
export default class AI extends Player {
  #difficulty;
  #GAMEBOARDSIZE;
  #playedCells;

  /** Create an AI player. Initializes the AI player with a default difficulty level and sets up the gameboard size and played cells.
   */
  constructor() {
    super();

    this.difficulty = 0;
    this.#GAMEBOARDSIZE = this.gameboard.board.length;
    this.#playedCells = [];
  }

  /** Set the difficulty level of the AI player. Validates the input index to ensure it is within the acceptable range (0 or 1).
   * @param {number} index - The index of the difficulty level (0 for easy, 1 for hard).
   */
  set difficulty(index) {
    if (index < 0) {
      this.#difficulty = 0;
    } else if (index > 1) {
      this.#difficulty = 1;
    } else {
      this.#difficulty = index;
    }
  }

  /** Get the current difficulty level of the AI player.
   * @returns {number} The current difficulty level (0 or 1).
   */
  get difficulty() {
    return this.#difficulty;
  }

  /** Execute a play by the AI player. This method randomly selects a cell to attack on the opponent's gameboard.
   * @returns {Array} An array containing the column and row of the selected cell.
   */
  play() {
    return this.#getRandomCell();
  }

  /** Generate a random cell to attack on the gameboard. If the generated cell has already been played, it recursively calls itself to find a new cell.
   * @returns {Array} An array containing the column and row of the randomly selected cell.
   */
  #getRandomCell() {
    let cell = [];

    const column = this.#getRandomInt(this.#GAMEBOARDSIZE);
    cell.push(column);
    const row = this.#getRandomInt(this.#GAMEBOARDSIZE);
    cell.push(row);

    if (this.#isAlreadyPlayed(cell)) {
      cell = this.#getRandomCell();
    }

    this.#playedCells.push(cell);
    return cell;
  }

  /** Check if a specific cell has already been played.
   * @param {Array} cell - An array containing the column and row of the cell to check.
   * @returns {boolean} True if the cell has already been played, false otherwise.
   */
  #isAlreadyPlayed(cell) {
    return this.#playedCells.some(
      (item) => item[0] === cell[0] && item[1] === cell[1]
    );
  }

  /** Generate a random integer between 0 and the specified maximum.
   * @param {number} max - The upper limit (exclusive) for the random integer.
   * @returns {number} A random integer between 0 and max.
   */
  #getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}

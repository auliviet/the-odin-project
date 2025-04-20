import Player from "./player";

/** Class representing an AI player for the game. */
export default class AI extends Player {
  #difficulty;
  #GAMEBOARDSIZE;
  #successfulPlays;
  #opponentBoard;

  /** Create an AI player. Initializes the AI player with a default difficulty level and sets up the gameboard size and played cells.
   */
  constructor() {
    super();

    this.difficulty = 0;
    this.#GAMEBOARDSIZE = this.gameboard.board.length;
    this.#successfulPlays = [];
    this.#opponentBoard = [];
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
   * @param {Array} board A 2D array representing the gameboard of the opponent.
   * @returns {Array} An array containing the column and row of the selected cell.
   */
  play(board) {
    this.#opponentBoard = board;

    return this.#difficulty === 0
      ? this.#getRandomCell()
      : this.#getSurroundingCell();
  }

  /** Add a successful play to the list of successful plays.
   * @param {Array} cell - An array containing the column and row of the successful play.
   */
  addSuccessfulPlay(cell) {
    this.#successfulPlays.push(cell);
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

    return cell;
  }

  /** Get a surrounding cell based on the last successful play. If no valid surrounding cell is found, it recursively calls itself.
   * @returns {Array} An array containing the column and row of the selected surrounding cell.
   */
  #getSurroundingCell() {
    if (this.#successfulPlays.length === 0) {
      return this.#getRandomCell();
    }

    let [column, row] = this.#successfulPlays.at(-1);

    for (let i = column - 1; i <= column + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i === column || j === row) {
          if (this.#isOnBoard([i, j]) && !this.#isAlreadyPlayed([i, j])) {
            return [i, j];
          }
        }
      }
    }

    this.#successfulPlays.pop();

    return this.#getSurroundingCell();
  }

  /** Check if a specific cell has already been played.
   * @param {Array} cell - An array containing the column and row of the cell to check.
   * @returns {boolean} True if the cell has already been played, false otherwise.
   */
  #isAlreadyPlayed(cell) {
    const [column, row] = cell;

    return this.#opponentBoard[column][row].isPlayed;
  }

  /** Check if a cell is within the bounds of the gameboard.
   * @param {Array} cell - An array containing the column and row of the cell to check.
   * @returns {boolean} True if the cell is on the board, false otherwise.
   */
  #isOnBoard(cell) {
    const [column, row] = cell;

    return (
      column >= 0 &&
      column < this.#GAMEBOARDSIZE &&
      row >= 0 &&
      row < this.#GAMEBOARDSIZE
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

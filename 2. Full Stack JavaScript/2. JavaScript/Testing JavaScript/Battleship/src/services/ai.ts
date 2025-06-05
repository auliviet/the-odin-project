import Player from "./player";
import { Board, Coordinates } from "./gameboard";

/** Class representing an AI player for the game. */
export default class AI extends Player {
  #difficulty: number = 0;
  #GAMEBOARDSIZE: number;
  #successfulPlays: Coordinates[];
  #opponentBoard: Board;

  /** Create an AI player. Initializes the AI player with a default difficulty level and sets up the gameboard size and played cells.
   */
  constructor() {
    super();
    this.#GAMEBOARDSIZE = this.gameboard.board.length;
    this.#successfulPlays = [];
    this.#opponentBoard = [];
  }

  /** Set the difficulty level of the AI player. Validates the input index to ensure it is within the acceptable range (0 or 1).
   */
  set difficulty(index: number) {
    if (index < 0) {
      this.#difficulty = 0;
    } else if (index > 1) {
      this.#difficulty = 1;
    } else {
      this.#difficulty = index;
    }
  }

  /** Get the current difficulty level of the AI player.
   */
  get difficulty(): number {
    return this.#difficulty;
  }

  /** Execute a play by the AI player. This method randomly selects a cell to attack on the opponent's gameboard.
   */
  play(board: Board): Coordinates {
    this.#opponentBoard = board;

    return this.#difficulty === 0
      ? this.#getRandomCell()
      : this.#getSurroundingCell();
  }

  /** Add a successful play to the list of successful plays.
   */
  addSuccessfulPlay(cell: Coordinates) {
    this.#successfulPlays.push(cell);
  }

  /** Generate a random cell to attack on the gameboard. If the generated cell has already been played, it recursively calls itself to find a new cell.
   */
  #getRandomCell(): Coordinates {
    let cell: Coordinates = [];

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
   */
  #getSurroundingCell(): Coordinates {
    if (this.#successfulPlays.length === 0) {
      return this.#getRandomCell();
    }

    let [column, row] = this.#successfulPlays[this.#successfulPlays.length - 1];

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
   */
  #isAlreadyPlayed(cell: Coordinates): boolean {
    const [column, row] = cell;

    return this.#opponentBoard[column][row].isPlayed;
  }

  /** Check if a cell is within the bounds of the gameboard.
   */
  #isOnBoard(cell: Coordinates): Boolean {
    const [column, row] = cell;

    return (
      column >= 0 &&
      column < this.#GAMEBOARDSIZE &&
      row >= 0 &&
      row < this.#GAMEBOARDSIZE
    );
  }

  /** Generate a random integer between 0 and the specified maximum.
   */
  #getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}

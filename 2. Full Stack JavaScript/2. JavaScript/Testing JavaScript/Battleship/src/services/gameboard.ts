import Ship from "./ship";

type Direction = "horizontal" | "vertical";
export type Board = Cell[][];
export type Coordinates = number[];

/** Class representing a gameboard containing ships. */
export class Gameboard {
  #SIZE = 10;
  #DIRECTIONS = ["horizontal", "vertical"];
  board: Board;

  constructor(
    public ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 3),
      new Ship("Destroyer", 2),
      new Ship("Destroyer", 2),
    ],
  ) {
    this.board = this.#initialiseBoard();
  }

  /** Place a ship at specific coordinates on the board.
   * @param {Object} ship object of class Ship
   * @param {string} direction direction of the ship, horizontal or vertical
   * @param {Array} startPoint column and row where the ship starts
   * @returns {boolean} True if the placement is successful, false otherwise
   */
  placeShip(
    ship: Ship,
    direction: Direction,
    startPoint: Coordinates,
  ): boolean {
    const cells = this.#validCoordinates(ship, direction, startPoint);
    if (cells) {
      cells.forEach(([column, row]) => {
        this.board[column][row].placedShip = ship;
      });
      return true;
    }

    return false;
  }

  /** Randomly place a ship on the board.
   */
  placeShipRandomly(ship: Ship): boolean {
    const direction = this.#getRandomDirection();
    const startPoint = [this.#getRandomInt(10), this.#getRandomInt(10)];

    return this.placeShip(ship, direction, startPoint);
  }

  /** Randomly place all ships on the board. This method attempts to place each ship in the `ships` array randomly until all ships are placed.
   */
  placeAllShipsRandomly(): void {
    this.ships.forEach((ship) => {
      let placedShip = false;
      while (!placedShip) {
        try {
          this.placeShipRandomly(ship);
          placedShip = true;
        } catch (error) {}
      }
    });
  }

  /** Receive an attack at specific coordinates on the board.
   */
  receiveAttack(cell: Coordinates): boolean {
    if (!this.#isValidCoordinates(cell) || !this.#isCellNotPlayed(cell)) {
      throw new Error(`Invalid attack at [${cell}]`);
    }

    let [column, row] = cell;
    this.board[column][row].isPlayed = true;

    const placedShip = this.board[column][row].placedShip;

    if (placedShip) {
      placedShip.hit();
      this.#markDiagonalCellsAsPlayed([column, row]);

      if (placedShip.isSunk()) {
        this.#markCellsSurroundingShipAsPlayed([column, row]);
      }
      return true;
    }

    return false;
  }

  /** Verify if all ships are sunk.
   */
  areAllShipsSunk(): boolean {
    return this.ships.every((ship) => ship.isSunk());
  }

  /** Create an empty gameboard.
   */
  #initialiseBoard(): Board {
    let board: Board = [];

    for (let column = 0; column < this.#SIZE; column++) {
      let newColumn: Cell[] = [];

      for (let row = 0; row < this.#SIZE; row++) {
        newColumn.push(new Cell());
      }

      board.push(newColumn);
    }

    return board;
  }

  /** Verify if a ship can be placed at a specific start point. A ship must be placed on the board, on empty cells, and it must be surrounded by empty cells.
   */
  #validCoordinates(
    ship: Ship,
    direction: Direction,
    startPoint: Coordinates,
  ): Coordinates[] {
    try {
      this.#isValidPlacementParamaters(ship, direction, startPoint);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }

    const [column, row] = startPoint;
    const length = ship.length;
    const cells = this.#getCoordinates(length, direction, [column, row]);

    // Validate if each cell the ship should occupy meet the requirements
    for (const cell of cells) {
      if (!this.#isCellOnBoard(cell)) {
        throw new Error(`Cell [${cell}] is out of bounds.`);
      } else if (!this.#isCellEmpty(cell)) {
        throw new Error(`Cell [${cell}] is not empty.`);
      } else if (!this.#areAdjacentCellsEmpty(cell)) {
        throw new Error(`Cell [${cell}] is not adjacent to empty cells.`);
      }
    }

    return cells;
  }

  /** Verify if a set of coordinates is valid. A set of coordinates must be an array of two values, each within the bounds of the board.
   */
  #isValidCoordinates(cell: Coordinates): boolean {
    if (
      !Array.isArray(cell) ||
      cell.length !== 2 ||
      !this.#isCellOnBoard(cell)
    ) {
      return false;
    }

    return true;
  }

  /** Verify the parameters to place a ship. Validates that the ship is an instance of Ship, the direction is valid, and the start point is valid.
   */
  #isValidPlacementParamaters(
    ship: Ship,
    direction: Direction,
    startPoint: Coordinates,
  ): boolean {
    if (!(ship instanceof Ship)) {
      throw new Error("Invalid placement. Ship object expected");
    }

    if (!this.#DIRECTIONS.includes(direction)) {
      throw new Error(`Invalid placement. Expects ${this.#DIRECTIONS}`);
    }

    if (!this.#isValidCoordinates(startPoint)) {
      throw new Error(`Invalid placement on cell [${startPoint}]`);
    }

    return true;
  }

  /** Validate if a specific set of coordinates is on the board.
   */
  #isCellOnBoard([column, row]: Coordinates): boolean {
    return column >= 0 && column < this.#SIZE && row >= 0 && row < this.#SIZE;
  }

  /** Validate if a ship is not placed on a specific set of coordinates.
   */
  #isCellEmpty([column, row]: Coordinates): boolean {
    return this.board[column][row].placedShip === null;
  }

  /** Validate if the cell has already been played.
   */
  #isCellNotPlayed([column, row]: Coordinates): boolean {
    return !this.board[column][row].isPlayed;
  }

  /** Validate if a ship is surrounded by empty cells.
   */
  #areAdjacentCellsEmpty([column, row]: Coordinates): boolean {
    for (
      let adjacentColumn = column - 1;
      adjacentColumn <= column + 1;
      adjacentColumn++
    ) {
      for (let adjacentRow = row - 1; adjacentRow <= row + 1; adjacentRow++) {
        // Skip the center cell
        if (adjacentColumn === column && adjacentRow === row) {
          continue;
        }

        const cell = [adjacentColumn, adjacentRow];
        if (this.#isCellOnBoard(cell) && !this.#isCellEmpty(cell)) {
          return false;
        }
      }
    }

    return true;
  }

  /** Get the list of coordinates occupied by a ship. Generates the coordinates based on the ship's length and direction.
   */
  #getCoordinates(
    length: number,
    direction: Direction,
    startPoint: Coordinates,
  ): Coordinates[] {
    let listOfCoordinates: Coordinates[] = [];
    let [column, row] = startPoint;

    if (direction === "horizontal") {
      for (let i = column; i < column + length; i++) {
        listOfCoordinates.push([i, row]);
      }
    } else if (direction === "vertical") {
      for (let j = row; j < row + length; j++) {
        listOfCoordinates.push([column, j]);
      }
    }

    return listOfCoordinates;
  }

  /** Return a random number between 0 and max.
   */
  #getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  /** Return a random direction.
   */
  #getRandomDirection(): Direction {
    return this.#getRandomInt(2) === 0 ? "horizontal" : "vertical";
  }

  /** Marks the adjacent cells of a given cell as played. This function checks the surrounding cells (including diagonals) of the specified cell and marks them as played if they are on the board.
   */
  #markDiagonalCellsAsPlayed([column, row]: Coordinates): void {
    for (let i = column - 1; i < column + 2; i += 2) {
      for (let j = row - 1; j < row + 2; j += 2) {
        if (this.#isCellOnBoard([i, j])) {
          this.board[i][j].isPlayed = true;
        }
      }
    }
  }

  /** Marks the cells surrounding a ship as played. This method recursively checks the surrounding cells of the specified cell and marks them as played if they contain a ship. It also ensures that cells are not revisited by using a Set to track visited cells.
   */
  #markCellsSurroundingShipAsPlayed(
    [column, row]: Coordinates,
    visitedCells = new Set(),
  ): void {
    const cell = `${column},${row}`;
    if (visitedCells.has(cell)) {
      return;
    }
    visitedCells.add(cell);

    if (this.board[column][row].placedShip) {
      for (let i = column - 1; i <= column + 1; i++) {
        for (let j = row - 1; j <= row + 1; j++) {
          if (this.#isCellOnBoard([i, j])) {
            this.board[i][j].isPlayed = true;
            this.#markCellsSurroundingShipAsPlayed([i, j], visitedCells);
          }
        }
      }
    } else {
      return;
    }
  }
}

/** Class representing the cells used on the board. */
export class Cell {
  /** Create an empty cell */
  constructor(
    public placedShip: Ship | null = null,
    public isPlayed = false,
  ) {}
}

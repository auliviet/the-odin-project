import Ship from "./ship";

/** Class representing a gameboard containing ships. */
export class Gameboard {
  #SIZE = 10;
  #DIRECTIONS = ["horizontal", "vertical"];

  /** Create a gameboard and initialize the ships.
   * @param {Array} listOfShip - An array of Ship objects (not used in the constructor).
   */
  constructor() {
    this.board = this.#initialiseBoard();
    this.ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 3),
      new Ship("Destroyer", 2),
      new Ship("Destroyer", 2),
    ];
  }

  /** Place a ship at specific coordinates on the board.
   * @param {Object} ship object of class Ship
   * @param {string} direction direction of the ship, horizontal or vertical
   * @param {Array} startPoint column and row where the ship starts
   * @returns {boolean} True if the placement is successful, false otherwise
   */
  placeShip(ship, direction, startPoint) {
    const cells = this.#isValidPlacement(ship, direction, startPoint);
    if (cells) {
      cells.forEach(([column, row]) => {
        this.board[column][row].placedShip = ship;
      });
      return true;
    }

    return false;
  }

  /** Randomly place a ship on the board.
   * @returns {boolean} true if the ship was successfuly placed, false otherwise
   */
  placeShipRandomly(ship) {
    const direction = this.#getRandomDirection();
    const startPoint = [this.#getRandomInt(10), this.#getRandomInt(10)];

    return this.placeShip(ship, direction, startPoint);
  }

  /** Randomly place all ships on the board. This method attempts to place each ship in the `ships` array randomly until all ships are placed.
   */
  placeAllShipsRandomly() {
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
   * @param {Array} cell column and row to attack
   * @returns {boolean} True if the attack is valid, flase otherwise
   */
  receiveAttack(cell) {
    if (!this.#isValidCoordinates(cell) || !this.#isCellNotPlayed(cell)) {
      throw new Error(`Invalid attack at [${cell}]`);
    }

    let [column, row] = cell;
    this.board[column][row].isPlayed = true;
    if (this.board[column][row].placedShip) {
      this.board[column][row].placedShip.hit();
      this.#markDiagonalCellsAsPlayed([column, row]);

      if (this.board[column][row].placedShip.isSunk()) {
        this.#markCellsSurroundingShipAsPlayed([column, row]);
      }
      return true;
    }

    return false;
  }

  /** Verify if all ships are sunk.
   * @returns {boolean} True if all ships are sunk, false if at lease one ship is not sunk
   */
  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  /** Create an empty gameboard.
   * @returns {Array} A 2D array of specified length and height, with each element being an empty Cell.
   */
  #initialiseBoard() {
    let board = [];

    for (let column = 0; column < this.#SIZE; column++) {
      let newColumn = [];

      for (let row = 0; row < this.#SIZE; row++) {
        newColumn.push(new Cell());
      }

      board.push(newColumn);
    }

    return board;
  }

  /** Verify if a ship can be placed at a specific start point. A ship must be placed on the board, on empty cells, and it must be surrounded by empty cells.
   * @param {Object} ship - An object of class Ship.
   * @param {string} direction - Direction of the ship, either "horizontal" or "vertical".
   * @param {Array} startPoint - Column and row where the ship starts.
   * @returns {Array} List of cells the ship will occupy if placement is valid.
   */
  #isValidPlacement(ship, direction, startPoint) {
    try {
      this.#isValidPlacementParamaters(ship, direction, startPoint);
    } catch (error) {
      throw new Error(error);
    }

    const [column, row] = startPoint;
    const length = ship.length;
    const cells = this.#getCells(length, direction, [column, row]);

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
   * @param {Array} cell column and row of the coordinates to validate
   * @returns {boolean} true if the input is valid, false otherwise
   */
  #isValidCoordinates(cell) {
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
   * @param {Object} ship - An object of class Ship.
   * @param {string} direction - Direction of the ship, either "horizontal" or "vertical".
   * @param {Array} startPoint - Column and row where the ship starts.
   * @returns {boolean} True if the parameters are valid, throws an error otherwise.
   */
  #isValidPlacementParamaters(ship, direction, startPoint) {
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
   * @param {Array} cell expressed as [column, row]
   * @returns {boolean} true if the coordinates are on the board, false otherwise
   */
  #isCellOnBoard([column, row]) {
    return column >= 0 && column < this.#SIZE && row >= 0 && row < this.#SIZE;
  }

  /** Validate if a ship is not placed on a specific set of coordinates.
   * @param {Array} cell expressed as [column, row]
   * @returns {boolean} true if the cell is empty, false otherwise
   */
  #isCellEmpty([column, row]) {
    return this.board[column][row].placedShip === null;
  }

  /** Validate if the cell has already been played.
   * @param {Array} cell expressed as [column, row]
   * @returns {boolean} true if the cell has not been played, false otherwise
   */
  #isCellNotPlayed([column, row]) {
    return !this.board[column][row].isPlayed;
  }

  /** Validate if a ship is surrounded by empty cells.
   * @param {Array} cell expressed as [column, row]
   * @returns {boolean} true if the cell is surrounded by empty cells, false otherwise
   */
  #areAdjacentCellsEmpty([column, row]) {
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
   * @param {Number} length - The number of cells occupied by a ship.
   * @param {string} direction - The direction of the ship, either "horizontal" or "vertical".
   * @param {Array} startPoint - The column and row where the ship starts.
   * @returns {Array} The list of cells occupied by the ship.
   */
  #getCells(length, direction, startPoint) {
    let listOfCells = [];
    let [column, row] = startPoint;

    if (direction === "horizontal") {
      for (let i = column; i < column + length; i++) {
        listOfCells.push([i, row]);
      }
    } else if (direction === "vertical") {
      for (let j = row; j < row + length; j++) {
        listOfCells.push([column, j]);
      }
    }

    return listOfCells;
  }

  /** Return a random number between 0 and max.
   * @param {Number} max the highest number that can be randomly chosen
   * @returns {Number} random number between 0 and max
   */
  #getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /** Return a random direction.
   * @returns {string} "horizontal" or "vertical" randomly chosen
   */
  #getRandomDirection() {
    return this.#DIRECTIONS[this.#getRandomInt(2)];
  }

  /** Marks the adjacent cells of a given cell as played. This function checks the surrounding cells (including diagonals) of the specified cell and marks them as played if they are on the board.
   * @param {Array} cell expressed as [column, row]
   * @returns {void}
   */
  #markDiagonalCellsAsPlayed([column, row]) {
    for (let i = column - 1; i < column + 2; i += 2) {
      for (let j = row - 1; j < row + 2; j += 2) {
        if (this.#isCellOnBoard([i, j])) {
          this.board[i][j].isPlayed = true;
        }
      }
    }
  }

  /** Marks the cells surrounding a ship as played. This method recursively checks the surrounding cells of the specified cell and marks them as played if they contain a ship. It also ensures that cells are not revisited by using a Set to track visited cells.
   * @param {Array<number>} cell - An array containing the column and row of the cell to check.
   * @param {Set<string>} [visitedCells=new Set()] - A Set to keep track of cells that have already been processed.
   * @returns {void} This method does not return a value.
   */
  #markCellsSurroundingShipAsPlayed([column, row], visitedCells = new Set()) {
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
  constructor() {
    this.placedShip = null;
    this.isPlayed = false;
  }
}

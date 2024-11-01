export default function knightMoves(start, end) {
  const board = new Board();
  const queue = [];

  // Validate user input
  validateInput();

  // Populate the queue with the start position and an empty path
  queue.push([start, []]);

  while (queue.length > 0) {
    // Select the first element of the queue and update its path.
    let [[currentX, currentY], path] = queue.shift();
    let newPath = [...path, [currentX, currentY]];

    // If the current position matches the destination, return the path required to reach this position.
    if (currentX === end[0] && currentY === end[1]) {
      printResult(newPath);
      return;
    }
    // Else, add all the possible next moves (from validMoves) for this position to the queue.
    else {
      let cell = board.cells[currentX][currentY];
      cell.validMoves.forEach((validMove) => {
        queue.push([validMove, newPath]);
      });
    }
  }

  // Print result in the console
  function printResult(path) {
    console.log(`You made it in ${path.length - 1} moves! Here is your path:`);
    path.forEach((element) => {
      console.log(element);
    });
  }

  // Check if the start and end position are in the board.
  function validateInput() {
    if (
      start[0] < 0 ||
      start[0] >= board.rows ||
      end[0] < 0 ||
      end[0] >= board.rows ||
      start[1] < 0 ||
      start[1] >= board.columns ||
      end[1] < 0 ||
      end[1] >= board.columns
    ) {
      throw new Error(
        `Position not within the boundaries of the board (0 - ${
          board.rows - 1
        })`
      );
    }
  }
}

class Board {
  constructor(rows = 8, columns = rows) {
    this.rows = rows;
    this.columns = columns;
    this.cells = this.populateBoard();
  }

  // Create a 2D arrays made of cells.
  populateBoard() {
    let cells = [];

    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.columns; j++) {
        let cell = new Cell(i, j);
        cell.validMoves = this.validMoves(i, j);

        row.push(cell);
      }
      cells.push(row);
    }

    return cells;
  }

  // Return the list of valid moves for a specific position by checking if the moves are within the boundaries of the board.
  validMoves(row, column) {
    let validMoves = [];

    // Check all possible moves using a compass-like notation (ie. nnw = north north-west).

    // NNE
    if (row + 2 < this.rows && column + 1 < this.columns) {
      validMoves.push([row + 2, column + 1]);
    }

    // ENE
    if (row + 1 < this.rows && column + 2 < this.columns) {
      validMoves.push([row + 1, column + 2]);
    }

    // ESE
    if (row - 1 >= 0 && column + 2 < this.columns) {
      validMoves.push([row - 1, column + 2]);
    }

    // SSE
    if (row - 2 >= 0 && column + 1 < this.columns) {
      validMoves.push([row - 2, column + 1]);
    }

    // SSW
    if (row - 2 >= 0 && column - 1 >= 0) {
      validMoves.push([row - 2, column - 1]);
    }

    // WSW
    if (row - 1 >= 0 && column - 2 >= 0) {
      validMoves.push([row - 1, column - 2]);
    }

    // WNW
    if (row + 1 < this.rows && column - 2 >= 0) {
      validMoves.push([row + 1, column - 2]);
    }

    // NNW
    if (row + 2 < this.rows && column - 1 >= 0) {
      validMoves.push([row + 2, column - 1]);
    }

    return validMoves;
  }

  // Print the board in the console, with the current position marked as X and all possible moves as O.
  prettyPrint(x, y) {
    let validMoves = this.cells[x][y].validMoves;

    for (let i = 0; i < this.rows; i++) {
      let row = "";
      for (let j = 0; j < this.columns; j++) {
        let cell = " . ";

        // Check if the cursor is on a validMove.
        for (let k = 0; k < validMoves.length; k++) {
          if (validMoves[k][0] === i && validMoves[k][1] === j) {
            cell = " O ";
          }
        }

        row += cell;
      }
      console.log(row);
    }
  }
}

class Cell {
  constructor(x, y) {
    this.row = x;
    this.column = y;
    // Store the validMoves (edges) for a specific cell in an adgacency list.
    this.validMoves = [];
  }
}

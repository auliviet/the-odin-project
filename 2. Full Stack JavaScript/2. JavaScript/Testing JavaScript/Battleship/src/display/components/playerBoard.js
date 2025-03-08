import "./playerBoard.css";

/** Class representing the gameboard of a player. */
export default class PlayerBoard {
  /** Create a new PlayerBoard component.
   * @param {Object} params - Parameters for the PlayerBoard.
   * @param {Array} params.board - The game board represented as a 2D array.
   * @param {boolean} params.isOpponent - Indicates if this board is for an opponent.
   */
  constructor({ board, isOpponent }) {
    this.board = board;
    this.isOpponent = isOpponent;
    this.boardElement = document.createElement("section");

    this.#renderBoard(this.boardElement);
  }

  /** Render the board and return the HTML section.
   * @returns {HTMLElement} The section to be displayed on the page.
   */
  render() {
    return this.boardElement;
  }

  /** Create and render the base board.
   * @param {HTMLElement} boardHTML - The HTML element to render the board into.
   */
  #renderBoard(boardHTML) {
    const size = this.board.length;

    boardHTML.className = "player-board";

    let grid = this.#createColumnHeaders(size);

    for (let column = 0; column < size; column++) {
      grid += this.#createRowHeaders(column);

      for (let row = 0; row < size; row++) {
        grid += this.#createCell(this.board[column][row], column, row);
      }
    }

    boardHTML.innerHTML = grid;
  }

  /** Create the row headers for the board.
   * @param {number} index - The index of the column.
   * @returns {string} HTML string for the header.
   */
  #createRowHeaders(index) {
    return `
    <div class="cell header">
      ${String.fromCharCode(65 + index)}
    </div>`;
  }

  /** Create the column headers for the board.
   * @param {number} length - The number of rows on the board.
   * @returns {string} HTML string for the header column.
   */
  #createColumnHeaders(length) {
    let header = `<div class="empty header"></div>`;

    for (let i = 0; i < length; i++) {
      header += `
      <div class="cell header">
        ${i + 1}
      </div> 
      `;
    }

    return header;
  }

  /** Create a cell to be displayed on the board. The content of the cell varies if a ship is placed on the cell and if it has been played.
   * @param {Cell} cell - Object of class Cell.
   * @param {number} column - Index of the column.
   * @param {number} row - Index of the row.
   * @returns {string} HTML string for the cell.
   */
  #createCell(cell, column, row) {
    return `
    <div class="cell ${this.isOpponent ? "target" : ""} ${this.#getCellClass(cell)}" data-column="${column}" data-row="${row}">
    </div>
  `;
  }

  /** Get the display value for a cell based on its state.
   * @param {Cell} cell - Object of class Cell.
   * @returns {string} The display value for the cell.
   */
  #getCellClass(cell) {
    if (cell.isPlayed) {
      return cell.placedShip
        ? cell.placedShip.isSunk()
          ? "sunk"
          : "hit"
        : "miss";
    }
    return cell.placedShip ? "ship" : "";
  }
}

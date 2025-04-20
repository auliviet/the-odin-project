import PlayerBoard from "../components/playerBoard";
import playerShips from "../components/playerShips";
import Winner from "../components/winner";

/** Class representing the game page of the application. */
export default class GamePage {
  /** Creates an instance of GamePage.
   * @param {Display} display - The display instance that manages the rendering of pages.
   */
  constructor(display) {
    this.display = display;
    this.game = display.game;
    this.player1 = this.game.player1;
    this.player2 = this.game.player2;
  }

  /** Refreshes the game area by updating the player elements and displaying the winner if there is one.
   */
  #refreshGameArea() {
    const gameArea = document.querySelector(".game-area");
    gameArea.innerHTML = "";
    gameArea.append(
      this.#playerElements(this.player1),
      this.#playerElements(this.player2)
    );

    if (this.game.winner) {
      this.#winnerSection(gameArea);
    }
  }

  /** Creates the player elements section for a given player.
   * @param {Player} player - The player object containing player information.
   * @returns {HTMLElement} The section element containing the player's board and ships.
   */
  #playerElements(player) {
    const section = document.createElement("section");
    section.className = "player-area";

    const playerName = document.createElement("h2");
    playerName.className = "player-name";
    playerName.textContent = `${player.name.toUpperCase()}'S SHIPS`;

    section.append(
      this.#playerBoard(player),
      playerName,
      new playerShips({
        ships: player.gameboard.ships,
        isOpponent: player === this.game.opponent ? true : false,
      }).render()
    );

    return section;
  }

  /** Creates the player board for a given player.
   * @param {Player} player - The player object containing player information.
   * @returns {DocumentFragment} A DocumentFragment containing the player's board.
   */
  #playerBoard(player) {
    const isOpponent = player === this.game.opponent ? true : false;

    const fragment = new DocumentFragment();
    fragment.appendChild(
      new PlayerBoard({
        board: player.gameboard.board,
        isOpponent,
      }).render()
    );

    if (isOpponent) {
      this.#addBoardEvents(fragment);
    }

    return fragment;
  }

  /** Displays the winner section in the game area.
   * @param {HTMLElement} gameArea - The game area element where the winner section will be appended.
   */
  #winnerSection(gameArea) {
    const winnerComponent = new Winner(this.game.winner.name).render();
    const button = winnerComponent.querySelector("button");
    this.#addResetEvent(button);

    const playerName = gameArea.querySelectorAll("h2");
    playerName.forEach((name) => (name.style.visibility = "hidden"));

    const playerShips = gameArea.querySelectorAll(".player-ships");
    playerShips.forEach((section) => (section.style.visibility = "hidden"));

    // Remove events on board
    const boards = document.querySelectorAll(".player-board");
    boards.forEach((board) => {
      this.#removeBoardEvents(board);
    });

    gameArea.append(winnerComponent);
  }

  /** Adds a reset event to the winner button.
   * @param {HTMLElement} button - The button element that triggers the reset event.
   */
  #addResetEvent(button) {
    button.addEventListener("click", () => {
      this.game.resetGame();
      this.player1 = this.game.player1;
      this.player2 = this.game.player2;

      this.#refreshGameArea();
    });
  }

  /** Adds click events to the cells of the player's board.
   * @param {HTMLElement} board - The board element containing the cells.
   */
  #addBoardEvents(board) {
    const cells = board.querySelectorAll(".cell");
    this.boundClickOnBoardEvent = this.#clickOnBoardEvent.bind(this);

    cells.forEach((cell) => {
      cell.addEventListener("click", this.boundClickOnBoardEvent);
    });
  }

  /** Removes click events from the cells of the player's board.
   * @param {HTMLElement} board - The board element containing the cells.
   */
  #removeBoardEvents(board) {
    const cells = board.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.className = cell.className.replace(" target", "");
      cell.removeEventListener("click", this.boundClickOnBoardEvent);
    });
  }

  /** Handles the click event on a cell in the player's board. Retrieves the column and row from the clicked cell and attempts to play the game move. If an error occurs during the play, it logs the error to the console.
   * @param {Event} cell - The click event object containing the target cell.
   */
  #clickOnBoardEvent(cell) {
    const column = Number(cell.target.dataset.column);
    const row = Number(cell.target.dataset.row);

    try {
      this.game.play([column, row]);
    } catch (error) {
      console.error(error);
    }

    this.#refreshGameArea();
  }

  /** Renders the game page.
   * @returns {DocumentFragment} A DocumentFragment containing the rendered game page elements.
   */
  render() {
    const gameArea = document.createElement("section");
    gameArea.className = "game-area";
    gameArea.append(
      this.#playerElements(this.player1),
      this.#playerElements(this.player2)
    );

    return gameArea;
  }
}

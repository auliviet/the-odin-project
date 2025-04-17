import PlayerBoard from "../components/playerBoard";
import playerShips from "../components/playerShips";
import Winner from "../components/winner";

/** Class representing the game page of the application. */
export default class GamePage {
  /**
   * Creates an instance of GamePage.
   * @param {Display} display - The display instance that manages the rendering of pages.
   */
  constructor(display) {
    this.display = display;
    this.game = display.game;
    this.player1 = this.game.player1;
    this.player2 = this.game.player2;
  }

  #refreshGameArea() {
    const gameArea = document.querySelector(".game-area");
    gameArea.innerHTML = "";
    gameArea.append(
      this.#playerElements(this.player1),
      this.#playerElements(this.player2)
    );

    // Winner function - to move to a new class
    if (this.game.winner) {
      this.#winnerSection(gameArea);
    }
  }

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

  #winnerSection(gameArea) {
    const winnerComponent = new Winner(this.player1.name).render();
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

  #addResetEvent(button) {
    button.addEventListener("click", () => {
      this.game.resetGame();
      this.player1 = this.game.player1;
      this.player2 = this.game.player2;

      this.#refreshGameArea();
    });
  }

  #addBoardEvents(board) {
    const cells = board.querySelectorAll(".cell");
    this.boundClickOnBoardEvent = this.#clickOnBoardEvent.bind(this);

    cells.forEach((cell) => {
      cell.addEventListener("click", this.boundClickOnBoardEvent);
    });
  }

  #removeBoardEvents(board) {
    const cells = board.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.className = cell.className.replace(" target", "");
      cell.removeEventListener("click", this.boundClickOnBoardEvent);
    });
  }

  #clickOnBoardEvent(cell) {
    const column = cell.target.dataset.column;
    const row = cell.target.dataset.row;

    try {
      this.game.play([column, row]);
    } catch (error) {
      console.error(error);
    }

    this.#refreshGameArea();
  }

  /**
   * Renders the game page.
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

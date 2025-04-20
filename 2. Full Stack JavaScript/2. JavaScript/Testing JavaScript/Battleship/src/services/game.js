import Player from "./player";
import AI from "./ai";

/** Class representing an instance of the game. */
export default class Game {
  #DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
  #difficulty = this.#DIFFICULTIES[0];

  /** Create a new game.
   * @param {String} player1Name - The name of player 1 (default is "Player").
   * @param {String} player2Name - The name of player 2 (if not provided, an AI player is created).
   */
  constructor(player1Name = "Player", player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = player2Name
      ? new Player(player2Name)
      : new AI(this.#DIFFICULTIES.indexOf(this.#difficulty));
    this.activePlayer = this.player1;
    this.opponent = this.player2;
    this.realPlayers = 1;
    this.winner = null;

    // Pre-populate the players's board.
    this.player1.gameboard.placeAllShipsRandomly();
    this.player2.gameboard.placeAllShipsRandomly();
  }

  /** Get the current difficulty level of the game.
   * @returns {String} The current difficulty level (EASY, MEDIUM, HARD).
   */
  get difficulty() {
    return this.#difficulty;
  }

  /** Set the difficulty level of the game. Validates the input index and updates the difficulty level accordingly.
   * @param {Number} difficultyIndex - The index of the difficulty level (0 for EASY, 1 for MEDIUM, 2 for HARD).
   */
  set difficulty(difficultyIndex = 0) {
    // Validate input
    if (difficultyIndex < 0 || difficultyIndex > 2) {
      difficultyIndex = 0;
    }

    this.#difficulty = this.#DIFFICULTIES[difficultyIndex];

    if (this.player2.type === "computer") {
      this.player2.difficulty = this.#DIFFICULTIES.indexOf(this.#difficulty);
    }
  }

  /** Execute a play by attacking the opponent's gameboard at the specified cell. If the active player is an AI, it automatically selects a cell to attack. If the attack results in all opponent's ships being sunk, the current player is declared the winner.
   * @param {Array} cell - An array containing the column and row to attack.
   * @throws {Error} Throws an error if the attack is invalid.
   * @returns {void}
   */
  play(cell) {
    if (this.winner) {
      return;
    }

    // Auto-play for AI
    if (this.activePlayer.type === "computer") {
      cell = this.activePlayer.play(this.opponent.gameboard.board);
    }

    try {
      let attack = this.opponent.gameboard.receiveAttack(cell);
      if (attack && this.activePlayer.type === "computer") {
        this.activePlayer.addSuccessfulPlay(cell);
      }

      if (this.opponent.gameboard.areAllShipsSunk()) {
        this.winner = this.activePlayer;
      }

      if (!attack) {
        this.#switchActivePlayers();
      }
    } catch (error) {
      throw new Error(error);
    }

    if (this.activePlayer.type === "computer") {
      this.play();
    }

    return;
  }

  /** Starts a new game by removing existing data and reinitializing players. Resets the game state, including player names, gameboards, and the winner.
   */
  resetGame() {
    const player1Name = this.player1.name;
    const player2Name = this.player2.name;
    const difficulty = this.player2.difficulty;

    this.player1 = new Player(player1Name);
    this.player2 =
      this.realPlayers > 1 ? new Player(player2Name) : new AI(difficulty);

    this.activePlayer = this.player1;
    this.opponent = this.player2;

    // Pre-populate the players's board.
    this.player1.gameboard.placeAllShipsRandomly();
    this.player2.gameboard.placeAllShipsRandomly();

    this.winner = null;
  }

  /** Switch the active player and the opponent. This method is used to alternate turns between players during the game.
   */
  #switchActivePlayers() {
    let temp = this.activePlayer;
    this.activePlayer = this.opponent;
    this.opponent = temp;
  }
}

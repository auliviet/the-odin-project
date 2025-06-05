import Player from "./player";
import AI from "./ai";
import { Coordinates } from "./gameboard";

/** Class representing an instance of the game. */
export default class Game {
  #DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];
  #difficulty = this.#DIFFICULTIES[0];
  player1: Player;
  player2: Player | AI;
  activePlayer: Player | AI;
  opponent: Player | AI;
  realPlayers: number;
  winner: null | Player | AI;

  /** Create a new game.
   */
  constructor(player1Name = "Player", player2Name?: string) {
    this.player1 = new Player(player1Name);
    this.player2 = player2Name ? new Player(player2Name) : new AI();
    this.activePlayer = this.player1;
    this.opponent = this.player2;
    this.realPlayers = 1;
    this.winner = null;

    // Pre-populate the players's board.
    this.player1.gameboard.placeAllShipsRandomly();
    this.player2.gameboard.placeAllShipsRandomly();
  }

  /** Get the current difficulty level of the game.
   */
  get difficulty(): string {
    return this.#difficulty;
  }

  /** Set the difficulty level of the game. Validates the input index and updates the difficulty level accordingly.
   */
  set difficulty(difficultyIndex: number) {
    // Validate input
    if (difficultyIndex < 0 || difficultyIndex > 2) {
      difficultyIndex = 0;
    }

    this.#difficulty = this.#DIFFICULTIES[difficultyIndex];

    if (this.player2 instanceof AI) {
      this.player2.difficulty = this.#DIFFICULTIES.indexOf(this.#difficulty);
    }
  }

  /** Execute a play by attacking the opponent's gameboard at the specified cell. If the active player is an AI, it automatically selects a cell to attack. If the attack results in all opponent's ships being sunk, the current player is declared the winner.
   */
  play(cell: Coordinates = [0, 0]): void {
    if (this.winner) {
      return;
    }

    // Auto-play for AI
    if (this.#isAI(this.activePlayer)) {
      cell = this.activePlayer.play(this.opponent.gameboard.board);
    }

    try {
      let attack = this.opponent.gameboard.receiveAttack(cell);
      if (attack && this.#isAI(this.activePlayer)) {
        this.activePlayer.addSuccessfulPlay(cell);
      }

      if (this.opponent.gameboard.areAllShipsSunk()) {
        this.winner = this.activePlayer;
      }

      if (!attack) {
        this.#switchActivePlayers();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
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

    this.player1 = new Player(player1Name);

    if (this.#isAI(this.player2)) {
      const difficulty = this.player2.difficulty;
      const newAI = new AI();
      newAI.difficulty = difficulty;
      this.player2 = newAI;
    } else {
      this.player2 = new Player(player2Name);
    }

    this.activePlayer = this.player1;
    this.opponent = this.player2;

    // Pre-populate the players's board.
    this.player1.gameboard.placeAllShipsRandomly();
    this.player2.gameboard.placeAllShipsRandomly();

    this.winner = null;
  }

  /** Switch the active player and the opponent. This method is used to alternate turns between players during the game.
   */
  #switchActivePlayers(): void {
    let temp = this.activePlayer;
    this.activePlayer = this.opponent;
    this.opponent = temp;
  }

  /** Define if a Player is AI. */
  #isAI(player: Player | AI): player is AI {
    return (player as AI).type === "computer";
  }
}

import Game from "./game";
import Player from "./player";
import AI from "./ai";

jest.mock("./player");
jest.mock("./ai");

let game, gameAI;
let receiveAttackMock;

beforeEach(() => {
  jest.resetAllMocks();

  receiveAttackMock = jest.fn().mockReturnValue(false);
  areAllShipsSunkMock = jest.fn().mockReturnValue(false);
  aiPlay = jest.fn().mockReturnValue([0, 0]);

  Player.mockImplementation((name = "Player") => {
    return {
      name,
      gameboard: {
        placeAllShipsRandomly: jest.fn(),
        receiveAttack: receiveAttackMock,
        areAllShipsSunk: areAllShipsSunkMock,
      },
    };
  });

  AI.mockImplementation(() => {
    return {
      name: "Computer",
      type: "computer",
      difficulty: 0,
      gameboard: {
        board: [0, 0],
        placeAllShipsRandomly: jest.fn(),
        receiveAttack: receiveAttackMock,
        areAllShipsSunk: areAllShipsSunkMock,
      },
      play: aiPlay,
      addSuccessfulPlay: jest.fn(),
    };
  });

  game = new Game("Player", "Computer");
  gameAI = new Game();
});

describe("Game class", () => {
  test("Game class exists", () => {
    expect(game).toBeInstanceOf(Game);
  });

  test("Game has two players", () => {
    expect(game.player1).toBeDefined();
    expect(game.player2).toBeDefined();
  });
});

describe("Game.difficulty()", () => {
  test("Game.difficulty() to EASY", () => {
    game.difficulty = 0;
    expect(game.difficulty).toMatch("EASY");
  });

  test("Game.difficulty() to MEDIUM", () => {
    game.difficulty = 1;
    expect(game.difficulty).toMatch("MEDIUM");
  });

  test("Game.difficulty() to HARD", () => {
    game.difficulty = 2;
    expect(game.difficulty).toMatch("HARD");
  });

  test("Game.setDiffuclty() to default to EASY", () => {
    expect(game.difficulty).toMatch("EASY");

    game.difficulty = 3;
    expect(game.difficulty).toMatch("EASY");

    game.difficulty = -3;
    expect(game.difficulty).toMatch("EASY");
  });
});

describe("Game.play()", () => {
  test("Game.play() attacks the cell selected by the player if the input is valid.", () => {
    game.play();

    expect(receiveAttackMock).toHaveBeenCalled();
  });

  test("Game.play() changes the active player if no ship is hit", () => {
    expect(game.activePlayer.name).toMatch("Player");
    expect(game.opponent.name).toMatch("Computer");

    game.play();

    expect(game.activePlayer.name).toMatch("Computer");
    expect(game.opponent.name).toMatch("Player");
  });

  test("Game.play() let the player attack again if the input is invalid", () => {
    // Make receiveAttack throw an error to simulate invalid input
    receiveAttackMock.mockImplementationOnce(() => {
      throw new Error("Test error");
    });

    expect(game.activePlayer.name).toMatch("Player");
    expect(game.opponent.name).toMatch("Computer");

    expect(() => game.play()).toThrow();

    expect(game.activePlayer.name).toMatch("Player");
    expect(game.opponent.name).toMatch("Computer");
  });

  test("Game.play() let the player attack again if the previous attack hit a ship", () => {
    // Make receiveAttack return true to simulate hitting a ship
    receiveAttackMock.mockReturnValueOnce(true);

    expect(game.activePlayer.name).toMatch("Player");
    expect(game.opponent.name).toMatch("Computer");

    game.play();

    expect(game.activePlayer.name).toMatch("Player");
    expect(game.opponent.name).toMatch("Computer");
  });

  test("Game.play() returns the name of the winner, if there is a winner", () => {
    // Simulate all ships being sunk

    areAllShipsSunkMock.mockReturnValueOnce(true);
    expect(game.winner).toBeNull();

    game.play();

    expect(game.winner.name).toMatch(game.player1.name);
  });

  test("Game.play() automatically play when Player 2 is AI", () => {
    gameAI.play();
    expect(aiPlay).toHaveBeenCalled();
  });

  test("Game.play() keeps playing if it hits a ship", () => {
    // Make receiveAttack return true when it is the AI turn to simulate hitting a ship
    receiveAttackMock.mockReturnValueOnce(false).mockReturnValueOnce(true);

    gameAI.play();
    expect(aiPlay).toHaveBeenCalledTimes(2);
  });
});

describe("Game.reset()", () => {
  test("Game.reset() reset the values for each player", () => {
    // Simulate all ships being sunk
    areAllShipsSunkMock.mockReturnValueOnce(true);
    game.play();

    game.resetGame();
    expect(game.winner).toBeNull();
    expect(game.activePlayer).toMatchObject(game.player1);
    expect(game.opponent).toMatchObject(game.player2);
  });

  test("Game.reset() reset the values for AI", () => {
    expect(gameAI.player2.difficulty).toBe(0);

    gameAI.player2.difficulty = 2;
    gameAI.resetGame();
    expect(gameAI.player2.difficulty).toBe(2);
  });
});

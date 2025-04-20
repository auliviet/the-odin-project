import AI from "./ai";
import { Gameboard } from "./gameboard";

jest.mock("./gameboard");

let ai;

beforeEach(() => {
  jest.resetAllMocks();

  Gameboard.mockImplementation(() => {
    return {
      board: [
        [{ isPlayed: false }, { isPlayed: false }, { isPlayed: false }],
        [{ isPlayed: false }, { isPlayed: false }, { isPlayed: false }],
        [{ isPlayed: false }, { isPlayed: false }, { isPlayed: false }],
      ],
    };
  });

  ai = new AI();
});

describe("AI class", () => {
  test("AI class exists", () => {
    expect(ai).toBeInstanceOf(AI);
  });

  test("AI has a name", () => {
    expect(ai.name).toBeDefined();
  });

  test("AI default name is 'Computer'", () => {
    expect(ai.name).toMatch("computer");
  });

  test("AI type is 'computer", () => {
    expect(ai.type).toMatch("computer");
  });

  test("AI has a gameboard", () => {
    expect(ai.gameboard).toBeDefined();
  });

  test("AI has a difficulty", () => {
    expect(ai.difficulty).toBeDefined();
    expect(ai.difficulty).toBe(0);
  });

  test("AI can change difficulty", () => {
    expect(ai.difficulty).toBe(0);

    ai.difficulty = 1;
    expect(ai.difficulty).toBe(1);

    ai.difficulty = 2;
    expect(ai.difficulty).toBe(1);
  });
});

describe("AI.play()", () => {
  test("AI.play() returns a random cell to attack", () => {
    // Test 9 consecutive plays;
    for (let i = 0; i < 9; i++) {
      const opponentBoard = new Gameboard();
      const maxSize = opponentBoard.board.length;
      let cell = ai.play(opponentBoard.board);

      expect(cell[0]).toBeGreaterThanOrEqual(0);
      expect(cell[0]).toBeLessThan(maxSize);
      expect(cell[1]).toBeGreaterThanOrEqual(0);
      expect(cell[1]).toBeLessThan(maxSize);
    }
  });

  test("AI.play() does not attack a cell that has already been played", () => {
    const opponentBoard = new Gameboard();
    opponentBoard.board[0][0].isPlayed = true;

    // Test 8 consecutive plays;
    for (let i = 0; i < 8; i++) {
      let cell = ai.play(opponentBoard.board);

      expect(cell).not.toEqual([0, 0]);
    }
  });

  test("AI.play() priortise cells adjacent to the last successful hit if the difficulty is hard", () => {
    const opponentBoard = new Gameboard();

    ai.difficulty = 1;

    opponentBoard.board[1][1].isPlayed = true;
    ai.addSuccessfulPlay([1, 1]);

    let cell = ai.play(opponentBoard.board);
    console.log(cell);

    expect(cell).toEqual([0, 1]);
  });
});

import AI from "./ai";

let ai;

beforeEach(() => {
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
    // Test 20 consecutive plays;
    for (let i = 0; i < 20; i++) {
      let cell = ai.play();

      expect(cell[0]).toBeGreaterThanOrEqual(0);
      expect(cell[0]).toBeLessThanOrEqual(9);
      expect(cell[1]).toBeGreaterThanOrEqual(0);
      expect(cell[1]).toBeLessThanOrEqual(9);
    }
  });

  test("AI.play() does not attack a cell that has already been played", () => {
    // Test 100 consecutive plays;
    const playedCells = [];

    for (let i = 0; i < 100; i++) {
      let cell = ai.play();

      // Check if the cell is already in playedCells
      expect(
        playedCells.some((item) => item[0] === cell[0] && item[1] === cell[1])
      ).toBeFalsy();

      // Add the cell to the playedCells array
      playedCells.push(cell);
    }
  });
});

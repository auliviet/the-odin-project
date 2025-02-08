import { Gameboard, Cell } from "./gameboard";
import Ship from "./ship";

let gameboard;
const smallShip = new Ship("Small", 2);
const largeShip = new Ship("Large", 4);

beforeEach(() => {
  gameboard = new Gameboard();

  jest.resetAllMocks();
});

describe("Gameboard class", () => {
  test("Gameboard class exists", () => {
    expect(gameboard).toBeInstanceOf(Gameboard);
  });

  test("Gameboard has a 2D array of 10x10 cells representing the board", () => {
    expect(gameboard.board).toBeDefined();
    expect(gameboard.board).toBeInstanceOf(Array);
    expect(gameboard.board.length).toBe(10);

    for (let column = 0; column < 10; column++) {
      expect(gameboard.board[column]).toBeInstanceOf(Array);
      expect(gameboard.board[column].length).toBe(10);
    }
  });

  test("Gameboard is made of empty Cells", () => {
    for (let column = 0; column < 10; column++) {
      for (let row = 0; row < 10; row++) {
        expect(gameboard.board[column][row]).toBeInstanceOf(Cell);
        expect(gameboard.board[column][row].placedShip).toBeNull();
        expect(gameboard.board[column][row].isPlayed).toBeFalsy();
      }
    }
  });

  test("Gameboard has a default list of ships", () => {
    expect(gameboard.ships).toBeInstanceOf(Array);
    expect(gameboard.ships.length).toBe(6);
    expect(gameboard.ships[0]).toBeInstanceOf(Ship);
  });
});

describe("Gameboard.placeShip()", () => {
  test("Gameboard.placeShip() expects a Ship, a direction and a starting point", () => {
    // Missing parameters
    expect(() => {
      gameboard.placeship();
    }).toThrow();

    // Incorect Ship
    expect(() => {
      gameboard.placeship(12, "horizontal", [0, 0]);
    }).toThrow();

    // Incorrect direction
    expect(() => {
      gameboard.placeship(smallShip, "vert", [0, 0]);
    }).toThrow();

    // Incorrect start point format
    expect(() => {
      gameboard.placeship(smallShip, "vertical", 4);
    }).toThrow();

    // Incorrect start point format
    expect(() => {
      gameboard.placeship(smallShip, "vertical", [11, 0, 2]);
    }).toThrow();

    // Start point outside the board
    expect(() => {
      gameboard.placeship(smallShip, "vertical", [0, 20]);
    }).toThrow();
  });

  test("Gameboard.placeShip() can place ships at specific coordinates by calling the ship class.", () => {
    expect(gameboard.placeShip(largeShip, "vertical", [0, 0])).toBeTruthy();
    expect(gameboard.board[0][0].placedShip.name).toMatch("Large");
    expect(gameboard.board[0][1].placedShip.name).toMatch("Large");
    expect(gameboard.board[0][2].placedShip.name).toMatch("Large");
    expect(gameboard.board[0][3].placedShip.name).toMatch("Large");
    expect(gameboard.board[0][4].placedShip).toBeNull();

    expect(gameboard.placeShip(smallShip, "horizontal", [4, 3])).toBeTruthy();
    expect(gameboard.board[4][3].placedShip.name).toMatch("Small");
    expect(gameboard.board[5][3].placedShip.name).toMatch("Small");
    expect(gameboard.board[6][3].placedShip).toBeNull();
  });

  test("Gameboard.placeShip() cannot place a ship starting outside the board.", () => {
    expect(() => {
      gameboard.placeShip(smallShip, "vertical", [0, -1]);
    }).toThrow();
    expect(() => {
      gameboard.placeShip(largeShip, "horizontal", [11, 0]);
    }).toThrow();
  });

  test("Gameboard.placeShip() cannot place a ship finishing outside the board.", () => {
    expect(() => {
      gameboard.placeShip(smallShip, "vertical", [0, 9]);
    }).toThrow();
    expect(() => {
      gameboard.placeShip(smallShip, "horizontal", [9, 0]);
    }).toThrow();
  });

  test("Gameboard.placeShip() cannot place a ship overlapping another ship.", () => {
    expect(gameboard.placeShip(smallShip, "horizontal", [1, 2])).toBeTruthy();
    expect(() => {
      gameboard.placeShip(largeShip, "vertical", [3, 0]);
    }).toThrow();
  });

  test("Gameboard.placeShip() cannot place a ship directly next to another ship.", () => {
    expect(gameboard.placeShip(smallShip, "horizontal", [1, 2])).toBeTruthy();
    expect(() => {
      gameboard.placeShip(largeShip, "horizontal", [0, 3]);
    }).toThrow();
  });
});

describe("Gameboard.receiveAttack()", () => {
  test("Gameboard.receiveAttack() expects a pair of coordinates.", () => {
    expect(() => {
      gameboard.receiveAttack();
    }).toThrow();
    expect(() => {
      gameboard.receiveAttack([0, 3, 2]);
    }).toThrow();
    expect(() => {
      gameboard.receiveAttack([0, 20]);
    }).toThrow();
    expect(() => {
      gameboard.receiveAttack([-1, 0]);
    }).toThrow();
  });

  test("Gameboard.receiveAttack() is valid if the coordinates are on the board.", () => {
    expect(gameboard.receiveAttack([0, 2])).toBeFalsy();
    expect(gameboard.receiveAttack([8, 5])).toBeFalsy();
  });

  test("Gameboard.receiveAttack() should record if a cell has been played", () => {
    expect(gameboard.board[0][0].isPlayed).toBeFalsy();

    gameboard.receiveAttack([0, 0]);
    expect(gameboard.board[0][0].isPlayed).toBeTruthy();
  });

  test("Gameboard.receiveAttack() cannot receive attack twice for the same coordinates.", () => {
    expect(gameboard.receiveAttack([0, 2])).toBeFalsy();
    expect(() => {
      gameboard.receiveAttack([0, 2]);
    }).toThrow();
  });

  test("Gameboard.receiveAttack() adds a hit to the correct ship, if a ship is placed on the coordinates.", () => {
    const spyOnLargeShipHit = jest.spyOn(largeShip, "hit");

    gameboard.placeShip(largeShip, "vertical", [0, 0]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    expect(spyOnLargeShipHit).toHaveBeenCalledTimes(2);

    gameboard.receiveAttack([0, 2]);
    gameboard.receiveAttack([0, 3]);
    expect(spyOnLargeShipHit).toHaveBeenCalledTimes(4);
  });

  test("Gameboard.receiveAttack() marks diagonally adjacent cells as played if a ship is hit", () => {
    const spyOnLargeShipHit = jest.spyOn(largeShip, "hit");

    gameboard.placeShip(largeShip, "vertical", [1, 1]);
    expect(gameboard.board[0][0].isPlayed).toBeFalsy();
    expect(gameboard.board[0][2].isPlayed).toBeFalsy();
    expect(gameboard.board[1][1].isPlayed).toBeFalsy();
    expect(gameboard.board[2][0].isPlayed).toBeFalsy();
    expect(gameboard.board[2][2].isPlayed).toBeFalsy();

    expect(gameboard.receiveAttack([1, 1])).toBeTruthy();
    expect(spyOnLargeShipHit).toHaveBeenCalledTimes(1);

    expect(gameboard.board[0][0].isPlayed).toBeTruthy();
    expect(gameboard.board[0][2].isPlayed).toBeTruthy();
    expect(gameboard.board[1][1].isPlayed).toBeTruthy();
    expect(gameboard.board[2][0].isPlayed).toBeTruthy();
    expect(gameboard.board[2][2].isPlayed).toBeTruthy();
  });

  test("Gameboard.receiveAttack() marks all adjacent cells as played if a ship is sunk", () => {
    const spyOnSmallShipHit = jest.spyOn(smallShip, "hit");

    gameboard.placeShip(smallShip, "vertical", [1, 1]);

    expect(gameboard.board[1][1].placedShip).not.toBeNull();
    expect(gameboard.board[1][2].placedShip).not.toBeNull();

    expect(gameboard.board[0][0].isPlayed).toBeFalsy();
    expect(gameboard.board[0][1].isPlayed).toBeFalsy();
    expect(gameboard.board[0][2].isPlayed).toBeFalsy();
    expect(gameboard.board[0][3].isPlayed).toBeFalsy();
    expect(gameboard.board[1][0].isPlayed).toBeFalsy();
    expect(gameboard.board[1][1].isPlayed).toBeFalsy();
    expect(gameboard.board[1][2].isPlayed).toBeFalsy();
    expect(gameboard.board[1][3].isPlayed).toBeFalsy();
    expect(gameboard.board[2][0].isPlayed).toBeFalsy();
    expect(gameboard.board[2][1].isPlayed).toBeFalsy();
    expect(gameboard.board[2][2].isPlayed).toBeFalsy();
    expect(gameboard.board[2][3].isPlayed).toBeFalsy();

    expect(gameboard.receiveAttack([1, 1])).toBeTruthy();
    expect(gameboard.receiveAttack([1, 2])).toBeTruthy();
    expect(spyOnSmallShipHit).toHaveBeenCalledTimes(2);

    expect(gameboard.board[0][0].isPlayed).toBeTruthy();
    expect(gameboard.board[0][1].isPlayed).toBeTruthy();
    expect(gameboard.board[0][2].isPlayed).toBeTruthy();
    expect(gameboard.board[0][3].isPlayed).toBeTruthy();
    expect(gameboard.board[1][0].isPlayed).toBeTruthy();
    expect(gameboard.board[1][1].isPlayed).toBeTruthy();
    expect(gameboard.board[1][2].isPlayed).toBeTruthy();
    expect(gameboard.board[1][3].isPlayed).toBeTruthy();
    expect(gameboard.board[2][0].isPlayed).toBeTruthy();
    expect(gameboard.board[2][1].isPlayed).toBeTruthy();
    expect(gameboard.board[2][2].isPlayed).toBeTruthy();
  });
});

describe("Gameboard.areAllShipsSunk()", () => {
  test("Gameboard.areAllShipsSunk() is false if one or more ship is not sunk", () => {
    expect(gameboard.areAllShipsSunk()).toBeFalsy();
  });

  test("Gameboard.areAllShipsSunk() is false if one or more ship is not sunk", () => {
    gameboard.ships.forEach((ship) => {
      ship.hits = ship.length;
    });
    expect(gameboard.areAllShipsSunk()).toBeTruthy();
  });
});

describe("Gameboard.placeAllShipsRandomly()", () => {
  test("Gameboard.placeAllShipsRandomly() places all ships on the board", () => {
    gameboard.placeAllShipsRandomly();

    // Test on the default gameboard
    let placedShips = gameboard.board
      .flatMap((column) => column.map((cell) => cell.placedShip))
      .filter((ship) => ship !== null);
    expect(placedShips.length).toBe(19);
  });
});

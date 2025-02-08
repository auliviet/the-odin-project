import Ship from "./ship";

let smallShip;
let largeShip;
let defaultShip;

beforeEach(() => {
  smallShip = new Ship("Small Ship", 2);
  largeShip = new Ship("Large Ship", 4);
  defaultShip = new Ship();
});

describe("Ship class", () => {
  test("Ship class exists", () => {
    expect(smallShip).toBeInstanceOf(Ship);
    expect(largeShip).toBeInstanceOf(Ship);
    expect(defaultShip).toBeInstanceOf(Ship);
  });

  test("Ship has a name", () => {
    expect(smallShip.name).toBeDefined();
    expect(largeShip.name).toBeDefined();
    expect(defaultShip.name).toBeDefined();
    expect(smallShip.name).toMatch("Small Ship");
    expect(largeShip.name).toMatch("Large Ship");
    expect(defaultShip.name).toMatch("placeholderShip");
  });

  test("Ship has a length", () => {
    expect(smallShip.length).toBeDefined();
    expect(largeShip.length).toBeDefined();
    expect(defaultShip.length).toBeDefined();
    expect(smallShip.length).toBe(2);
    expect(largeShip.length).toBe(4);
    expect(defaultShip.length).toBe(1);
  });

  test("Ship cannot have a negative length", () => {
    let incorrectShip = new Ship("Incorrect", -1);
    expect(incorrectShip.length).toBeDefined();
    expect(incorrectShip.length).toBe(1);
  });

  test("Ship has hits", () => {
    expect(smallShip.hits).toBeDefined();
    expect(largeShip.hits).toBeDefined();
    expect(defaultShip.hits).toBeDefined();
    expect(smallShip.hits).toBe(0);
    expect(largeShip.hits).toBe(0);
    expect(defaultShip.hits).toBe(0);
  });
});

describe("Ship.hit()", () => {
  test("Ship.hit() method exists", () => {
    expect(smallShip.hit()).toBeDefined();
    expect(largeShip.hit()).toBeDefined();
    expect(defaultShip.hit()).toBeDefined();
  });

  test("Shit.hit() increases the number of hits on the ship", () => {
    expect(smallShip.hits).toBe(0);
    expect(largeShip.hits).toBe(0);
    expect(defaultShip.hits).toBe(0);

    smallShip.hit();
    largeShip.hit();
    defaultShip.hit();

    expect(smallShip.hits).toBe(1);
    expect(largeShip.hits).toBe(1);
    expect(defaultShip.hits).toBe(1);
  });

  test("Shit.hit() cannot exceed the length of the ship", () => {
    expect(smallShip.hits).toBe(0);
    expect(largeShip.hits).toBe(0);
    expect(defaultShip.hits).toBe(0);

    smallShip.hit();
    smallShip.hit();
    smallShip.hit();
    largeShip.hit();
    largeShip.hit();
    largeShip.hit();
    defaultShip.hit();
    defaultShip.hit();
    defaultShip.hit();

    expect(smallShip.hits).toBe(2);
    expect(largeShip.hits).toBe(3);
    expect(defaultShip.hits).toBe(1);
  });
});

describe("Ship.isSunk()", () => {
  test("Ship.isSunk() method exists", () => {
    expect(smallShip.isSunk()).toBeDefined();
    expect(largeShip.isSunk()).toBeDefined();
    expect(defaultShip.isSunk()).toBeDefined();
  });

  test("Shit.isSunk() is false if the ship is not sunk", () => {
    expect(smallShip.isSunk()).toBeFalsy();
    expect(largeShip.isSunk()).toBeFalsy();
    expect(defaultShip.isSunk()).toBeFalsy();
  });

  test("Shit.isSunk() is true if the ship is sunk", () => {
    expect(smallShip.isSunk()).toBeFalsy();
    expect(largeShip.isSunk()).toBeFalsy();
    expect(defaultShip.isSunk()).toBeFalsy();

    smallShip.hit();
    smallShip.hit();
    smallShip.hit();
    largeShip.hit();
    largeShip.hit();
    largeShip.hit();
    defaultShip.hit();
    defaultShip.hit();
    defaultShip.hit();

    expect(smallShip.isSunk()).toBeTruthy();
    expect(largeShip.isSunk()).toBeFalsy();
    expect(defaultShip.isSunk()).toBeTruthy();
  });
});

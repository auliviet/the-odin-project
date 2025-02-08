import Player from "./player";
import { Gameboard } from "./gameboard";

let player, defaultPlayer;

beforeEach(() => {
  player = new Player("My Name");
  defaultPlayer = new Player();
});

describe("Player class", () => {
  test("Player class exists", () => {
    expect(player).toBeInstanceOf(Player);
    expect(defaultPlayer).toBeInstanceOf(Player);
  });

  test("Player has a name", () => {
    expect(player.name).toBeDefined();
    expect(defaultPlayer.name).toBeDefined();
  });

  test("Player default name is 'Computer'", () => {
    expect(defaultPlayer.name).toMatch("computer");
  });

  test("Player name is custom for real players", () => {
    expect(player.name).not.toMatch("computer");
  });

  test("Player has a type", () => {
    expect(player.type).toBeDefined();
    expect(defaultPlayer.type).toBeDefined();
  });

  test("Player default type is 'computer", () => {
    expect(defaultPlayer.type).toMatch("computer");
  });

  test("Player type is 'real' for real players", () => {
    expect(player.type).toMatch("real");
  });

  test("Player type changes if the player has a name", () => {
    expect(defaultPlayer.type).toMatch("computer");
    defaultPlayer.name = "Custom";

    expect(defaultPlayer.type).toMatch("real");
  });

  test("Player has a gameboard", () => {
    expect(player.gameboard).toBeDefined();
    expect(player.gameboard).toBeInstanceOf(Gameboard);

    expect(defaultPlayer.gameboard).toBeDefined();
    expect(defaultPlayer.gameboard).toBeInstanceOf(Gameboard);
  });
});

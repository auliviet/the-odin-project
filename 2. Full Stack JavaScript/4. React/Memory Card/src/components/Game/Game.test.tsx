import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

const mockCharacters = [
  {
    id: 1,
    name: "char1",
    image: "img1",
    position: 1,
  },
  {
    id: 2,
    name: "char2",
    image: "img2",
    position: 2,
  },
  {
    id: 3,
    name: "char3",
    image: "img3",
    position: 3,
  },
];
const mockSetStatus = vi.fn();

function renderGame() {
  return render(
    <Game
      characters={mockCharacters}
      status="playing"
      setStatus={mockSetStatus}
    ></Game>
  );
}

function setup() {
  return {
    user: userEvent.setup(),
    ...renderGame(),
  };
}

describe("Game component", () => {
  test("Renders a list of cards", () => {
    renderGame();
    expect(screen.getAllByRole("button").length).toBe(mockCharacters.length);
  });

  test("Selects cards with tab", async () => {
    setup();
    const card1 = screen.getAllByRole("button")[0];
    const card2 = screen.getAllByRole("button")[1];

    await userEvent.tab();
    expect(card1).toHaveFocus();

    await userEvent.tab();
    expect(card2).toHaveFocus();
  });

  test("Increments score when selecting a new character", async () => {
    setup();
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveTextContent("0");

    // Click the first card
    let card = screen.getByAltText("char1");
    await userEvent.click(card);
    expect(footer).toHaveTextContent("1");

    // Find a different card
    card = screen.getByAltText("char2");
    await userEvent.click(card);
    expect(footer).toHaveTextContent("2");
  });

  test("Loses when selecting twice the same character", async () => {
    setup();

    let card = screen.getByAltText("char1");
    await userEvent.click(card);
    card = screen.getByAltText("char1");
    await userEvent.click(card);

    expect(mockSetStatus).toHaveBeenCalledWith("lost");
  });

  test("Wins when selecting each character once", async () => {
    setup();

    let card = screen.getByAltText("char1");
    await userEvent.click(card);

    card = screen.getByAltText("char2");
    await userEvent.click(card);

    card = screen.getByAltText("char3");
    await userEvent.click(card);

    expect(mockSetStatus).toHaveBeenCalledWith("won");
  });
});

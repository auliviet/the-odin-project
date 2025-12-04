import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import GameCard from "./GameCard";

const mockCharacter = {
  id: 1,
  name: "1",
  image: "1.jpg",
  position: 1,
};
const mockHandleSelection = vi.fn();

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("GameCard component", () => {
  test("Renders a button element", () => {
    render(
      <GameCard
        character={mockCharacter}
        handleSelection={mockHandleSelection}
      />
    );

    expect(screen.getByRole("button"));
  });

  test("Assigns a random animation duration", () => {
    Math.random = vi.fn(() => 0.25);
    render(
      <GameCard
        character={mockCharacter}
        handleSelection={mockHandleSelection}
      />
    );

    const wrapper = screen.getByRole("button").firstChild as HTMLElement;
    const duration = getComputedStyle(wrapper).getPropertyValue("--duration");

    expect(duration).toBe("700ms");
  });

  test("Focuses the card on tab", async () => {
    const { user } = setup(
      <GameCard
        character={mockCharacter}
        handleSelection={mockHandleSelection}
      />
    );
    const card = screen.getByRole("button");

    await user.tab();

    expect(card).toHaveFocus();
  });

  test("Calls the callback on click", async () => {
    const { user } = setup(
      <GameCard
        character={mockCharacter}
        handleSelection={mockHandleSelection}
      />
    );
    const card = screen.getByRole("button");

    await user.click(card);

    expect(mockHandleSelection).toHaveBeenCalledOnce();
  });
});

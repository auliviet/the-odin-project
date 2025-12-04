import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Welcome from "./Welcome";

const mockSetStatus = vi.fn();

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("Welcome component", () => {
  test("Renders a heading, a text and button element", () => {
    render(<Welcome setStatus={mockSetStatus} />);
    expect(screen.getByRole("banner"));
    expect(screen.getByRole("heading"));
    expect(screen.getByRole("paragraph"));
    expect(screen.getByRole("button"));
  });

  test("Focuses the button on tab", async () => {
    const { user } = setup(<Welcome setStatus={mockSetStatus} />);
    const button = screen.getByRole("button");

    await user.tab();

    expect(button).toHaveFocus();
  });

  test("Calls the callback on click", async () => {
    const { user } = setup(<Welcome setStatus={mockSetStatus} />);
    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockSetStatus).toHaveBeenCalledOnce();
  });
});

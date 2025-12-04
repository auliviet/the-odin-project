import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button component", () => {
  test("Renders a button element", () => {
    render(<Button onClick={() => null}>Button</Button>);
    expect(screen.getByRole("button"));
  });

  test("Renders the correct text", () => {
    const testText = "my-test-button";

    render(<Button onClick={() => null}>{testText}</Button>);
    expect(screen.getByRole("button", { name: testText }));
    expect(screen.getByRole("button").textContent).not.toMatch("my-button");
  });

  test("Calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();

    render(<Button onClick={handler}>Button</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handler).toHaveBeenCalledOnce();
  });

  test("Focuses the button on tab", async () => {
    const user = userEvent.setup();

    render(<Button onClick={() => null}>Button</Button>);
    const button = screen.getByRole("button");

    await user.tab();

    expect(button).toHaveFocus();
  });
});

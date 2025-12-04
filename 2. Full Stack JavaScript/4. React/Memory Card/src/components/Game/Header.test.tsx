import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("Renders a navigation element", () => {
    render(<Header />);
    expect(screen.getByRole("navigation"));
  });
  test("Renders the page title", () => {
    render(<Header />);
    expect(screen.getByRole("heading", { name: /citadel/i }));
  });
});

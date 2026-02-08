import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import HeroHeader from "./HeroHeader";

describe("HeroHeader component - unit test:", () => {
  test("Display title", () => {
    render(<HeroHeader />);

    expect(screen.getAllByRole("heading", { level: 1 }).length).toBe(2);
  });
});

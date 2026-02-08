import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("something truthy and falsy", () => {
  test("true to be true", () => {
    expect(true).toBe(true);
  });

  test("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App", () => {
  test("renders headline", () => {
    render(<App title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});

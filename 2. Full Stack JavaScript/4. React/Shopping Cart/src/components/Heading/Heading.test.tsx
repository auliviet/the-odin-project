import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Heading from "./Heading";

describe("Heading component - unit tests:", () => {
  test("Returns an H1 title.", () => {
    render(<Heading level={1} title="Hello" />);

    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  test("Returns an H2 title.", () => {
    render(<Heading level={2} title="Hello" />);

    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  test("Returns a body copy.", () => {
    render(
      <Heading level={2} title="Hello">
        Body
      </Heading>,
    );

    expect(screen.getByText(/body/i)).toBeInTheDocument();
  });
});

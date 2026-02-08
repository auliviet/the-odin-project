import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Footer from "./Footer";

describe("Footer component - unit tests:", () => {
  test("Renders content.", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByText(/drops everyday/));
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi, type Mock } from "vitest";
import ErrorMessage from "./ErrorMessage";
import { isRouteErrorResponse } from "react-router";

describe("ErrorMessage component - unit tests:", () => {
  test("Renders a route error.", () => {
    vi.mock("react-router", async () => ({
      ...(await vi.importActual("react-router")),
      isRouteErrorResponse: vi.fn(),
    }));

    const routeError = {
      status: 404,
      statusText: "Not Found",
      data: "The requested page does not exist.",
    };

    (isRouteErrorResponse as unknown as Mock).mockReturnValueOnce(true);

    render(<ErrorMessage error={routeError} />);

    expect(screen.getByRole("heading", { name: /404/ })).toBeInTheDocument();
    expect(screen.getByText(routeError.data)).toBeInTheDocument();
  });

  test("Renders a JS error.", () => {
    const error = new Error("Not found");

    render(<ErrorMessage error={error} />);

    expect(screen.getByRole("heading", { name: /error/i })).toBeInTheDocument();
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  test("Renders unknown error", () => {
    const unknown = { foo: "bar" } as unknown as Error;
    render(<ErrorMessage error={unknown} />);

    expect(
      screen.getByRole("heading", { name: /unknown error/i }),
    ).toBeInTheDocument();
  });
});

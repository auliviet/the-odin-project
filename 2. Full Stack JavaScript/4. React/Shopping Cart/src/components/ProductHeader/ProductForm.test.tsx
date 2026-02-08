import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProductForm from "./ProductForm";

describe("ProductHeader component - unit tests:", () => {
  const mockRouter = createBrowserRouter([
    { path: "/", element: <ProductForm /> },
  ]);

  test("Renders an input field.", () => {
    render(<RouterProvider router={mockRouter} />);

    expect(
      screen.getByRole("spinbutton", { name: /quantity/i }),
    ).toBeInTheDocument();
  });
});

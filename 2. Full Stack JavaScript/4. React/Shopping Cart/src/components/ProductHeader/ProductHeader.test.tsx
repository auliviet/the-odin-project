import type { Product } from "@/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ProductHeader from "./ProductHeader";
import { createBrowserRouter, RouterProvider } from "react-router";

describe("ProductHeader component - unit tests:", () => {
  const mockProduct: Product = {
    id: 1,
    title: "My product",
    description: "Product 1 description",
    price: 11,
    category: "bag",
    image: "image.png",
  };

  const mockRouter = createBrowserRouter([
    { path: "/", element: <ProductHeader product={mockProduct} /> },
  ]);

  test("Renders an image.", () => {
    render(<RouterProvider router={mockRouter} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByAltText(/my product/i)).toBeInTheDocument();
  });

  test("Renders the product title.", () => {
    render(<RouterProvider router={mockRouter} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /my product/i }),
    ).toBeInTheDocument();
  });

  test("Renders the product description.", () => {
    render(<RouterProvider router={mockRouter} />);

    expect(screen.getByText(/product 1 description/i)).toBeInTheDocument();
  });

  test("Renders the product price.", () => {
    render(<RouterProvider router={mockRouter} />);

    expect(screen.getByText(/11/)).toBeInTheDocument();
  });

  test("Renders the product form.", () => {
    render(<RouterProvider router={mockRouter} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});

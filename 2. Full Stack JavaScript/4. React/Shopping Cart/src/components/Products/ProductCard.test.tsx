import type { Product } from "@/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ProductCard } from "./ProductCard";
import { MemoryRouter } from "react-router";

describe("ProductCard component - unit tests:", () => {
  const mockProduct: Product = {
    id: 1,
    title: "product 1",
    price: 22,
    description: "this is a product",
    category: "default",
    image: "image.png",
  };

  test("Renders the product image with alt text.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img", { name: /product/ })).toBeInTheDocument();
    expect(screen.getByAltText(/this is a product/i)).toBeInTheDocument();
  });

  test("Renders the product name.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/product 1/)).toBeInTheDocument();
  });

  test("Renders the product price.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/22/)).toBeInTheDocument();
  });

  test("Renders a link.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProductCard product={mockProduct} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});

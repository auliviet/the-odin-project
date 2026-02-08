import type { Product } from "@/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ProductList from "./ProductList";
import { MemoryRouter } from "react-router";

describe("ProductList component - unit tests:", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 11,
      category: "Men",
      description: "My product 1",
      image: "image1.jpg",
    },
    {
      id: 2,
      title: "Product 2",
      price: 22,
      category: "Women",
      description: "My product 2",
      image: "image2.jpg",
    },
    {
      id: 3,
      title: "Product 3",
      price: 33,
      category: "Women",
      description: "My product 3",
      image: "image3.jpg",
    },
  ];

  test("Renders a list of products.", () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(3);
  });

  test("Renders a specific number of products.", () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} count={2} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByAltText(/my product 1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/my product 2/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/my product 3/i)).not.toBeInTheDocument();
  });

  test("Renders a specific category of items.", () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} category="Women" />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getByAltText(/my product 2/i)).toBeInTheDocument();
    expect(screen.getByAltText(/my product 3/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/my product 1/i)).not.toBeInTheDocument();
  });

  test("Does not render the current product.", () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} category="Women" excludedId={2} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(1);
    expect(screen.getByAltText(/my product 3/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/my product 1/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/my product 2/i)).not.toBeInTheDocument();
  });
});

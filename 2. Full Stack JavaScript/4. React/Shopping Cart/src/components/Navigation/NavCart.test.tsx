import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import NavCart from "./NavCart";
import type { Product } from "@/types";

describe("Cart Component - unit tests:", () => {
  const mockCart = [0, 2];
  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      price: 2,
      description: "Description",
      category: "Category",
      image: "img",
    },
    {
      id: 2,
      title: "Product 2",
      price: 2,
      description: "Description",
      category: "Category",
      image: "img",
    },
  ];

  test("Shows the number of item.", () => {
    render(<NavCart cart={mockCart} products={mockProducts} />);
    expect(screen.getByRole("button", { name: /2/ })).toBeInTheDocument();

    render(<NavCart cart={[]} products={[{} as Product]} />);
    expect(screen.getByRole("button", { name: /0/ })).toBeInTheDocument();
  });

  test("Shows different style if the cart is empty.", () => {
    render(<NavCart cart={mockCart} products={mockProducts} />);
    expect(screen.getByText("2")).not.toHaveClass(/empty/);

    render(<NavCart cart={[]} products={[{} as Product]} />);
    expect(screen.getByText("0")).toHaveClass(/empty/);
  });
});

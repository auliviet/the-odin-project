import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";
import { MemoryRouter } from "react-router";

describe("Navigation component - unit tests:", () => {
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

  test("Renders the site title.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /mystore/i }));
  });

  test("Renders a list of links.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(screen.getAllByRole("link").length).toBe(2);
  });

  test("Renders the cart button.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: /my cart/i }));
    expect(screen.getByRole("button", { name: /2/ }));
  });
});

describe("Navigation component - integration tests:", () => {
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

  test("Shows active state.", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /home/i })).toHaveClass(/active/);
    expect(screen.getByRole("link", { name: /products/i })).not.toHaveClass(
      /active/,
    );
  });

  test("Navigate to the product page.", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const productsLink = screen.getByRole("link", { name: /products/i });

    await user.click(productsLink);

    expect(screen.getByRole("link", { name: /products/i })).toHaveClass(
      /active/,
    );
  });

  test("Navigate to the home page.", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const homeLink = screen.getByRole("link", { name: /home/i });

    await user.click(homeLink);

    expect(screen.getByRole("link", { name: /home/i })).toHaveClass(/active/);
  });

  test("Opens the cart.", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Navigation cart={mockCart} products={mockProducts} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    const cartButton = screen.getByRole("button", { name: /cart/i });

    expect(
      screen.queryByRole("heading", { name: /cart/i }),
    ).not.toBeInTheDocument();

    await user.click(cartButton);

    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });
});

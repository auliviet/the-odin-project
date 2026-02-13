import { describe, expect, test, vi } from "vitest";
import { getAllProducts, getProduct } from "./products.helper";
import type { Product } from "@/types";

describe("getAllProducts():", () => {
  const mockResponse = [
    {
      id: 0,
      title: "string",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
    {
      id: 1,
      title: "string",
      price: 0.2,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
  ];

  test("Returns an array of Products.", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => mockResponse,
    });

    const results = await getAllProducts();
    expect(results).toEqual(mockResponse);
  });

  test("Uses the default URL when nor argument is provided", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => mockResponse,
    });

    await getAllProducts();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
    );
  });

  test("Overides the default URL when an argument is provided", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => mockResponse,
    });

    const url = "myUrl";
    await getAllProducts(url);

    expect(globalThis.fetch).toHaveBeenCalledWith(url);
  });

  test("Logs an error when request is not OK.", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockReturnValue(undefined);
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await getAllProducts();

    expect(consoleSpy).toHaveBeenCalledWith("Response status: 404");
  });

  test("Returns null when the request is not OK", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const results = await getAllProducts();

    expect(results).toBeUndefined();
  });
});

describe("GetProduct:", () => {
  const mockProducts: Product[] = [
    {
      id: 0,
      title: "string",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
    {
      id: 1,
      title: "string",
      price: 0.2,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
  ];

  test("Returns a product when the ID matches.", () => {
    const product0 = getProduct(0, mockProducts);
    expect(product0).toEqual(mockProducts[0]);

    const product1 = getProduct("1", mockProducts);
    expect(product1).toEqual(mockProducts[1]);
  });

  test("Returns an error when the ID does not exist.", () => {
    expect(() => {
      getProduct(-1, mockProducts);
    }).toThrow(/Product does not exist/);
  });

  test("Returns an error when no products are available.", () => {
    const mockEmptyProducts: Product[] = [];

    expect(() => {
      getProduct(1, mockEmptyProducts);
    }).toThrow();
  });
});

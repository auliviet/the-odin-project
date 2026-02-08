import { beforeEach, describe, expect, test, vi } from "vitest";
import { getCart, setCart, setEmptyCart } from "./cart.helper";

describe("getCart:", () => {
  // Set spies for localStorage
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

  function mockSetCart(value: string) {
    localStorage.setItem("cart", value);
  }

  beforeEach(() => {
    // Start each test with a clean slate
    localStorage.clear();
    vi.resetAllMocks();
  });

  test("Returns an array of numbers when the cart exists.", () => {
    mockSetCart("[1, 2, 3]");
    const cart = getCart();

    expect(getItemSpy).toHaveBeenCalled();
    expect(cart).toStrictEqual([1, 2, 3]);
  });

  test("Returns an empty array of when the cart is empty.", () => {
    mockSetCart("[]");
    const cart = getCart();

    expect(getItemSpy).toHaveBeenCalled();
    expect(cart).toStrictEqual([]);
  });

  test("Returns an empty array when the cart doesn't exist.", () => {
    const cart = getCart();

    expect(getItemSpy).toHaveBeenCalled();
    expect(cart).toStrictEqual([]);
  });

  test("Returns an empty array when the cart is not a valid JSON.", () => {
    mockSetCart("my-cart");
    const cart = getCart();

    expect(getItemSpy).toHaveBeenCalled();
    expect(cart).toStrictEqual([]);
  });

  test("Returns an empty array when the cart is not an array.", () => {
    mockSetCart("{ test: 1 }");
    const cart = getCart();

    expect(getItemSpy).toHaveBeenCalled();
    expect(cart).toStrictEqual([]);
  });

  test("Returns an empty array when the cart contains non-numbers.", () => {
    mockSetCart("[1, a, 2]");
    const cart = getCart();

    expect(getItemSpy).toHaveBeenCalled();
    expect(cart).toStrictEqual([]);
  });
});

describe("setCart:", () => {
  // Set spies for localStorage
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  function mockSetCart(value: string) {
    localStorage.setItem("cart", value);
  }

  beforeEach(() => {
    // Start each test with a clean slate
    localStorage.clear();
    vi.resetAllMocks();
  });

  test("Increments the count for a specific item.", () => {
    mockSetCart("[1, 0, 2]");
    // Verify default cart is set
    expect(getCart()).toStrictEqual([1, 0, 2]);

    setCart(1, 3);

    expect(setItemSpy).toBeCalledWith("cart", "[4,0,2]");
    expect(getCart()).toStrictEqual([4, 0, 2]);

    // Negative values
    setCart(1, -2);
    expect(setItemSpy).toBeCalledWith("cart", "[2,0,2]");
    expect(getCart()).toStrictEqual([2, 0, 2]);

    // 0 Count
    setCart(1, 0);
    expect(setItemSpy).toBeCalledWith("cart", "[2,0,2]");
    expect(getCart()).toStrictEqual([2, 0, 2]);
  });

  test("Returns an error if the productId is invalid.", () => {
    mockSetCart("[1, 2, 3]");

    // 0 index
    expect(() => {
      setCart(0, 2);
    }).toThrow(/does not exist/);

    // Undefined
    expect(() => {
      setCart(undefined, 2);
    }).toThrow(/does not exist/);

    // Empty id
    expect(() => {
      setCart("", 2);
    }).toThrow(/does not exist/);

    // Non-numerical values
    expect(() => {
      setCart("a", 2);
    }).toThrow(/does not exist/);

    // Null id
    expect(() => {
      // @ts-expect-error test incorrect input
      setCart(null, 2);
    }).toThrow(/does not exist/);
  });

  test("Returns an error if the ProductId is not in the cart.", () => {
    mockSetCart("[1, 2, 3]");

    expect(() => {
      setCart(4, 2);
    }).toThrow(/does not exist/);
  });

  test("Returns an error if the count is invalid.", () => {
    // NaN
    expect(() => {
      // @ts-expect-error test incorrect input
      setCart(1, "abc");
    }).toThrow(/does not exist/);

    // Undefined
    expect(() => {
      // @ts-expect-error test incorrect input
      setCart(1, undefined);
    }).toThrow(/does not exist/);

    // Null count
    expect(() => {
      // @ts-expect-error test incorrect input
      setCart(1, null);
    }).toThrow(/does not exist/);
  });

  test("Returns an error if the cart is not set.", () => {
    expect(() => {
      setCart(0, 2);
    }).toThrow(/does not exist/);
  });
});

describe("setEmtptyCart:", () => {
  test("Set an empty cart for a given length.", () => {
    setEmptyCart(3);

    expect(getCart()).toStrictEqual([0, 0, 0]);
  });

  test("Returns an error for invalid cart length.", () => {
    expect(() => {
      setEmptyCart(-1);
    }).toThrow();

    expect(() => {
      setEmptyCart(undefined);
    }).toThrow(/No products/);
  });
});

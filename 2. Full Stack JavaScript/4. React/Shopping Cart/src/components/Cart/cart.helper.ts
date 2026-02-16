export function getCart(): number[] {
  const raw = localStorage.getItem("cart");
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    const isNumberArray =
      Array.isArray(parsed) && parsed.every((item) => typeof item === "number");

    return isNumberArray ? parsed : [];
  } catch {
    // If the raw value from localStorage is not a valid JSON
    return [];
  }
}

export function setCart(productId: number | string | undefined, count: number) {
  const cart = getCart();
  const index = Number(productId) - 1; // productIds are not 0 indexed.

  if (!cart[index] && cart[index] !== 0) {
    throw new Error("Product does not exist");
  }

  cart[index] += count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function setEmptyCart(cartLength: number | undefined) {
  if (!cartLength) {
    throw new Error("No products available.");
  }

  const emptyCart = new Array<number>(cartLength).fill(0);
  localStorage.setItem("cart", JSON.stringify(emptyCart));

  return emptyCart;
}

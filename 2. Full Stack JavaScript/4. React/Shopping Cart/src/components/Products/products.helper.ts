import { type Product } from "@/types";

export async function getAllProducts(
  url = "https://fakestoreapi.com/products",
): Promise<Product[] | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status.toString()}`);
    }
    const results = (await response.json()) as Product[];

    return results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

export function getProduct(
  productId: string | number,
  products: Product[],
): Product | undefined {
  const index = Number(productId);

  const product = products.find((elem) => elem.id === index);

  if (!product) {
    throw new Error("Product does not exist.");
  }

  return product;
}

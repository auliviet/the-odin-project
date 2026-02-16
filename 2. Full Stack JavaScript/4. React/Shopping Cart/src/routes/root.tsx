/* eslint-disable react-refresh/only-export-components */
import { getCart, setEmptyCart } from "@/components/Cart";
import Navigation from "@/components/Navigation";
import { getAllProducts } from "@/components/Products";
import type { Product } from "@/types";
import { useLoaderData } from "react-router";
import { Outlet, useLocation } from "react-router";

export async function loader() {
  const products = await getAllProducts("https://fakestoreapi.com/products");
  const cart = getCart();

  if (cart.length !== products?.length) {
    const emptyCart = setEmptyCart(products?.length);

    return { products, cart: emptyCart };
  }

  return { products, cart };
}

export default function Root() {
  const location = useLocation();
  const { products, cart } = useLoaderData<{
    products: Product[];
    cart: number[];
  }>();

  return (
    <>
      {location.pathname !== "/" && (
        <Navigation cart={cart} products={products} />
      )}
      <Outlet context={{ products, cart }} />
    </>
  );
}

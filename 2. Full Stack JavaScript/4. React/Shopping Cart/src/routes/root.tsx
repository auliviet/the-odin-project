/* eslint-disable react-refresh/only-export-components */
import { getCart, setEmptyCart } from "@/components/Cart";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getAllProducts } from "@/components/Products";
import type { Product } from "@/types";
import { ScrollRestoration, useLoaderData } from "react-router";
import { Outlet } from "react-router";

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
  const { products, cart } = useLoaderData<{
    products: Product[];
    cart: number[];
  }>();

  console.log(location.pathname);

  return (
    <>
      {location.pathname !== "/the-odin-project/shopping-cart/" &&
        location.pathname !== "/the-odin-project/shopping-cart" && (
          <Navigation cart={cart} products={products} />
        )}
      <main>
        <Outlet context={{ products, cart }} />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

import Navigation from "@/components/Navigation";
import { getAllProducts } from "@/components/Products";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { Outlet, useLocation } from "react-router";

export async function loader() {
  const products = await getAllProducts("https://fakestoreapi.com/products");

  return { products };
}

export default function Root() {
  const location = useLocation();
  const { products } = useLoaderData();
  const [cart, setCart] = useState<number[]>(
    new Array(products.length).fill(0),
  );

  return (
    <>
      {location.pathname !== "/" && <Navigation />}
      <Outlet context={{ products, cart, setCart }} />
    </>
  );
}

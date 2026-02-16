import HeroHeader from "@/components/HeroHeader";
import Navigation from "@/components/Navigation";
import ProductList from "@/components/Products";
import { useOutletContext } from "react-router";
import type { contextType } from "@/types";

export default function Home() {
  const { products, cart } = useOutletContext<contextType>();

  return (
    <>
      <HeroHeader />
      <Navigation cart={cart} products={products} />
      <h2>Latest drops</h2>
      <ProductList products={products} />
    </>
  );
}

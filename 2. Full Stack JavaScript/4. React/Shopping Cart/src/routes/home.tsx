import HeroHeader from "@/components/HeroHeader";
import Navigation from "@/components/Navigation";
import ProductList from "@/components/Products";
import { useOutletContext } from "react-router";
import type { contextType } from "@/types";
import Heading from "@/components/Heading";

export default function Home() {
  const { products, cart } = useOutletContext<contextType>();

  return (
    <>
      <HeroHeader />
      <Navigation cart={cart} products={products} />
      <Heading level={2} title="Latest drops" />
      <ProductList products={products} count={6} />
    </>
  );
}

import HeroHeader from "@/components/HeroHeader";
import Navigation from "@/components/Navigation";
import ProductList from "@/components/Products";
import { useOutletContext } from "react-router";
import type { contextType } from "@/types";

export default function Home() {
  const { products } = useOutletContext<contextType>();

  return (
    <>
      <HeroHeader />
      <Navigation />
      <ProductList products={products} />
    </>
  );
}

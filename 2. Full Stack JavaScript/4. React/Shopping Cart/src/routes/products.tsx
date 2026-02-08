import Heading from "@/components/Heading";
import ProductList from "@/components/Products";
import { type contextType } from "@/types";
import { useOutletContext } from "react-router";

export default function Products() {
  const { products } = useOutletContext<contextType>();
  return (
    <>
      <Heading level={1} title="Shop all">
        A complete collection of thoughtfully designed essentials, built to
        support focused work and everyday use.
      </Heading>
      <ProductList products={products} />
    </>
  );
}

import { ProductCard } from "@/components/Products";
import { type contextType } from "@/types";
import { useOutletContext, useParams } from "react-router";

export default function ProductPage() {
  const params = useParams();
  if (!params.productId) {
    throw new Error("Product not found");
  }

  const { products } = useOutletContext<contextType>();

  return (
    <>
      <h1>PRODUCT PAGE</h1>
      <ProductCard productId={params.productId} products={products} />
      <button>Add to cart</button>
    </>
  );
}

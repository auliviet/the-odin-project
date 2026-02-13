import { Link } from "react-router";
import { getProduct } from "./products.helper";
import type { Product } from "@/types";

export function ProductCard({
  productId,
  products,
}: {
  productId: number | string;
  products: Product[];
}) {
  const product = getProduct(productId, products);

  return (
    product && (
      <Link to={`products/${product.id.toString()}`}>
        <section className="productCard">
          <img src={product.image} alt={product.description} />
          <p>{product.title}</p>
          <p>
            <span className="price">{product.price}</span>
          </p>
        </section>
      </Link>
    )
  );
}

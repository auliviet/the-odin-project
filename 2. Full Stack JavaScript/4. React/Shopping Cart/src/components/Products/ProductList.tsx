import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <section className="productsList">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard productId={product.id} products={products} />
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import classes from "./ProductList.module.css";

export default function ProductList({
  products,
  count,
  category,
  excludedId,
}: {
  products: Product[];
  count?: number;
  category?: string;
  excludedId?: number;
}) {
  let productList = [...products];

  if (category) {
    productList = productList.filter(
      (product) => product.category === category,
    );
  }

  if (excludedId) {
    productList = productList.filter((product) => product.id !== excludedId);
  }

  productList = productList.slice(0, count);

  return (
    <ul className={classes.productList}>
      {productList.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

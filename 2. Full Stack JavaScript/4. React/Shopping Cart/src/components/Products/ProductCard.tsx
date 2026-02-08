import { Link } from "react-router";
import type { Product } from "@/types";
import classes from "./ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id.toString()}`}
      className={classes.productCard}
    >
      <div className={classes.imageWrapper}>
        <img src={product.image} alt={product.description} />
      </div>

      <p className={classes.productName}>{product.title}</p>
      <p>
        <span className={classes.productPrice}>${product.price}</span>
      </p>
    </Link>
  );
}

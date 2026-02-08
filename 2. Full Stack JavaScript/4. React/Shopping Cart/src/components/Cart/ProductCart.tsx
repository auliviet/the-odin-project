import type { Product } from "@/types";
import classes from "./ProductCart.module.css";
import { setCart } from "./cart.helper";
import { useRevalidator } from "react-router";

export default function ProductCart({
  product,
  count,
}: {
  product: Product;
  count: number;
}) {
  const { revalidate } = useRevalidator();

  function onDelete() {
    setCart(product.id, -count);
    revalidate();
  }

  return (
    <li className={classes.productCart}>
      <div className={classes.imageWrapper}>
        <div className={classes.imageContainer}>
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className={classes.content}>
        <p className={classes.title}>{product.title}</p>
        <p className={classes.quantity}>
          Quantity: <span className={classes.count}>{count}</span>
        </p>
        <p className={classes.price}>$ {count * product.price}</p>
      </div>
      <button
        className={classes.close}
        onClick={() => {
          onDelete();
        }}
      >
        ✕
      </button>
    </li>
  );
}

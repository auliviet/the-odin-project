import type { Product } from "@/types";
import classes from "./Cart.module.css";
import ProductCart from "./ProductCart";

export default function Cart({
  isOpen,
  cart,
  products,
}: {
  isOpen: boolean;
  cart: number[];
  products: Product[];
}) {
  const isCart = cart.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  return (
    <div
      style={isOpen ? {} : { display: "none" }}
      className={classes.cartOverlay}
    >
      <aside className={classes.cartContent}>
        {isCart ? (
          <ul className={classes.list}>
            {cart.map((count, index) => {
              if (count > 0) {
                return <ProductCart product={products[index]} count={count} />;
              }
            })}
          </ul>
        ) : (
          <div className={classes.emptyCart}>Your cart is empty</div>
        )}
      </aside>
    </div>
  );
}

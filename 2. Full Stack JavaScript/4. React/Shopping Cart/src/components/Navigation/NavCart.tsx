import { useState } from "react";
import Cart from "../Cart";
import type { Product } from "@/types";
import classes from "./NavCart.module.css";

export default function NavCart({
  cart,
  products,
}: {
  cart: number[];
  products: Product[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((previous, current) => previous + current, 0);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button
        className={
          isOpen ? `${classes.navCart} ${classes.open}` : classes.navCart
        }
        onClick={toggleSidebar}
      >
        My Cart{" "}
        <span
          className={`${classes.count} ${cartCount <= 0 ? classes.empty : ""}`}
        >
          {cartCount}
        </span>
      </button>

      <Cart isOpen={isOpen} cart={cart} products={products} />
    </>
  );
}

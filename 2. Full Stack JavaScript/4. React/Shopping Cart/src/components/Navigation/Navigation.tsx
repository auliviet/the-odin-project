import { NavLink } from "react-router";
import NavCart from "./NavCart";
import type { Product } from "@/types";
import classes from "./Navigation.module.css";

export default function Navigation({
  cart,
  products,
}: {
  cart: number[];
  products: Product[];
}) {
  return (
    <nav className={classes.nav}>
      <div className={classes.mainNav}>
        <h1 className={classes.logo}>MYSTORE</h1>
        <ul className={classes.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : "")}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Products
            </NavLink>
          </li>
        </ul>
      </div>

      <NavCart cart={cart} products={products} />
    </nav>
  );
}

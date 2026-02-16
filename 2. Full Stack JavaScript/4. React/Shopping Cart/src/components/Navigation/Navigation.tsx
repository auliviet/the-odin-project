import { NavLink } from "react-router";
import NavCart from "./NavCart";
import type { Product } from "@/types";

export default function Navigation({
  cart,
  products,
}: {
  cart: number[];
  products: Product[];
}) {
  return (
    <nav>
      <div className="navLogo">
        <h1>MYSTORE</h1>
      </div>

      <div className="navLinks">
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="products">Products</NavLink>
          </li>
        </ul>
      </div>

      <NavCart cart={cart} products={products} />
    </nav>
  );
}

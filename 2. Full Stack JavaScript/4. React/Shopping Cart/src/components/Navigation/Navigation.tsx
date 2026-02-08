import { NavLink } from "react-router";
import NavCart from "./NavCart";

export default function Navigation() {
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

      <NavCart cartCount={0} />
    </nav>
  );
}

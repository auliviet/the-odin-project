import { useState } from "react";
import Cart from "../Cart";
import type { Product } from "@/types";

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
    <button className="navCart" onClick={toggleSidebar}>
      My Cart <span className="navCartCount">{cartCount}</span>
      <Cart isOpen={isOpen} cart={cart} products={products} />
    </button>
  );
}

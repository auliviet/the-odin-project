import type { Product } from "@/types";

export default function Cart({
  isOpen,
  cart,
  products,
}: {
  isOpen: boolean;
  cart: number[];
  products: Product[];
}) {
  return (
    <div style={isOpen ? {} : { display: "none" }}>
      <ul>
        {cart.map((count, index) => {
          return (
            <li key={products[index].id}>
              {products[index].id}: {count}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

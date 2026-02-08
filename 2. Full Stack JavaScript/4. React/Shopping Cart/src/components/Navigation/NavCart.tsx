export default function NavCart({ cartCount }: { cartCount: number }) {
  return (
    <div className="navCart">
      My Cart <span className="navCartCount">{cartCount}</span>
    </div>
  );
}

import type { Product } from "@/types";
import ProductForm from "./ProductForm";
import classes from "./ProductHeader.module.css";

export default function ProductHeader({ product }: { product: Product }) {
  return (
    <header className={classes.productHeader}>
      <div className={classes.imageWrapper}>
        <img src={product.image} alt={product.title} />
      </div>
      <section className={classes.productContent}>
        <h1>{product.title}</h1>
        <p className={classes.productDescription}>{product.description}</p>
        <p className={classes.productPrice}>$ {product.price}</p>
        <ProductForm />
      </section>
    </header>
  );
}

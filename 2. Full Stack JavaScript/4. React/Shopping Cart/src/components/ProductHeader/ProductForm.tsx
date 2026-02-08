import { Form } from "react-router";
import classes from "./ProductForm.module.css";

export default function ProductForm() {
  return (
    <Form method="post" name="productForm" className={classes.productForm}>
      <label>
        Quantity:
        <input type="number" min={0} name="count" defaultValue="1"></input>
      </label>
      <button type="submit">Add to cart</button>
    </Form>
  );
}

/* eslint-disable react-refresh/only-export-components */
import { setCart } from "@/components/Cart";
import { ProductCard } from "@/components/Products";
import { type contextType } from "@/types";
import { Form, useOutletContext, useParams, type Params } from "react-router";

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const { productId } = params;
  const formData = await request.formData();
  const count = Number(formData.get("count"));

  setCart(productId, count);
}

export default function ProductPage() {
  const { productId } = useParams();
  const { products } = useOutletContext<contextType>();

  return (
    <>
      <h1>PRODUCT PAGE</h1>
      <ProductCard productId={productId} products={products} />
      <Form method="post">
        <input name="count" defaultValue="1"></input>
        <button type="submit">Add to cart</button>
      </Form>
    </>
  );
}

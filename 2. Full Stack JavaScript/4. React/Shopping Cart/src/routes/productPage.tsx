/* eslint-disable react-refresh/only-export-components */
import { setCart } from "@/components/Cart";
import Heading from "@/components/Heading";
import ProductHeader from "@/components/ProductHeader";
import ProductList from "@/components/Products";
import { type contextType } from "@/types";
import { useOutletContext, useParams, type Params } from "react-router";

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
  const product = products[Number(productId) - 1];

  return (
    <>
      <ProductHeader product={product} />

      <Heading level={2} title="More products" />

      <ProductList
        products={products}
        count={3}
        category={product.category}
        excludedId={product.id}
      />
    </>
  );
}

import type { RouteObject } from "react-router";
import Root, { loader as rootLoader } from "./root";
import Home from "./home";
import ErrorPage from "./error";
import Products from "./products";
import ProductPage, { action as productPageAction } from "./productPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductPage />,
        action: productPageAction,
      },
    ],
  },
];

export default routes;

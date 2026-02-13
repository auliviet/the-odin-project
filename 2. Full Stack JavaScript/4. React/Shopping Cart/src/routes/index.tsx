import type { RouteObject } from "react-router";
import Root, { loader as rootLoader } from "./root";
import Home from "./home";
import ErrorPage from "./error";
import Products from "./products";
import ProductPage from "./productPage";

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
      },
    ],
  },
];

export default routes;

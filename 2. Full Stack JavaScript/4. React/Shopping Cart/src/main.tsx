import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "@/routes";

const router = createBrowserRouter(routes);
const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  throw new Error("Root does not exist");
}

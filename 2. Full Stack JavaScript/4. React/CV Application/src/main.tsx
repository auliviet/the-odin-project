import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");
if (!root) {
  throw new Error(
    '#root element not found – make sure the HTML contains <div id="root"></div>'
  );
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

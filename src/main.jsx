import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProductsProvider } from "./components/providers/products-provider.jsx";
import Header from "./components/header.jsx";
import CategoryPage from "./pages/category-page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/category/:id",
    element: <CategoryPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="overflow-x-hidden">
      <ProductsProvider>
        <Header />
        <RouterProvider router={router} />
      </ProductsProvider>
    </div>
  </StrictMode>,
);

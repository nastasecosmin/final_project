"use client";

import { useEffect, useState } from "react";
import { ProductsContext } from "./products-context";

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Luam produsele din API
        const res = await fetch("https://fakestoreapi.com/products");

        // Verificam daca raspunsul este ok
        if (!res.ok) throw new Error("Failed to fetch products");

        // Extragem datele din raspuns
        const data = await res.json();

        // Setam produsele in products state
        setProducts(data);

        // Extragem categoriile unice din produse
        const uniqueCategories = data
          .map((product) => product.category)
          .filter((category, index, arr) => arr.indexOf(category) === index);

        //Setam categoriile unice in categories state
        setCategories(["all", ...uniqueCategories]);
      } catch (err) {
        setError(err.message || "Error fetching products");
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryName = (categoryName) => {
    const category = categories.find(
      (x) =>
        x.replace(" ", "-").replace("'", "-").toLowerCase() === categoryName,
    );

    return category?.charAt(0).toUpperCase() + category?.slice(1) || "All";
  };

  const addToCart = (product) => {
    const exists = cart.some((item) => item.id === product.id);

    if (exists) return;

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        getCategoryName,
        addToCart,
        cart,
        removeFromCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

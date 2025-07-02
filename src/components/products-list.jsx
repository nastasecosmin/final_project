"use client";

import { ProductsContext } from "../components/providers/products-context";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePathname } from "../hooks/usePathname";

export const ProductsList = () => {
  const pathname = usePathname();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products, getCategoryName, loading, addToCart } =
    useContext(ProductsContext);

  useEffect(() => {
    const category = getCategoryName(pathname.split("/")[2]).toLowerCase();

    setFilteredProducts(
      products.filter((product) => {
        if (pathname === "/") return true;

        return product.category === category;
      }),
    );
  }, [pathname, products]);

  console.log(filteredProducts, "the category");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {filteredProducts.map((product) => (
        <div
          className="flex flex-col p-4 justify-between border rounded-lg w-full shadow-md basis-40 min-w-[260px] max-w-[240px] flex-1 flex-grow ease-in-out duration-300 hover:scale-[1.03] hover:shadow-xl"
          key={product.id}
        >
          <img
            className="object-contain rounded-t-md w-full h-40"
            src={product.image ?? ""}
            alt={product.title}
          />
          <div className="flex flex-col w-full px-4 py-3 gap-2 flex-1">
            <h3 className="text-base font-semibold line-clamp-2">
              {product.title}
            </h3>
            <span className="text-primary font-bold text-lg">
              ${product.price?.toFixed?.(2) ?? product.price}
            </span>
          </div>
          <div className="px-4 pb-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors text-sm cursor-pointer"
              onClick={() => addToCart(product)}
              type="button"
            >
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

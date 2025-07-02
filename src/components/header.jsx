"use client";

import { ProductsContext } from "./providers/products-context";
import { useContext } from "react";
import { getCategoryUrl } from "../lib/utils";
import { usePathname } from "../hooks/usePathname";
import { ShoppingBag } from "lucide-react";
import Cart from "./cart";
import { useState } from "react";

export default function Header() {
  const { categories, cart } = useContext(ProductsContext);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="flex justify-between h-20 items-center px-20 border-b fixed w-full bg-white">
      <div className="flex gap-4">
        <div>Logo</div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <a
              className={
                pathname === getCategoryUrl(category)
                  ? "text-orange-500"
                  : "text-gray-500"
              }
              href={getCategoryUrl(category)}
              key={category}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </a>
          ))}
        </div>
      </div>
      <button
        onClick={() => cart.length > 0 && setOpen(!open)}
        className="cursor-pointer relative"
      >
        <ShoppingBag />
        <span
          className={`absolute -top-3 -right-3 ${cart.length > 0 ? "size-6" : "size-0"} rounded-full bg-red-500 text-white flex items-center justify-center text-sm ease-in-out duration-300`}
        >
          {cart.length}
        </span>
      </button>
      <Cart open={open} setOpen={setOpen} />
    </header>
  );
}

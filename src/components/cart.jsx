import { useContext } from "react";
import { ProductsContext } from "./providers/products-context";
import { Button } from "./ui/button";
import { Trash2Icon, XIcon } from "lucide-react";
import { useEffect } from "react";

export default function Cart({ open, setOpen }) {
  const { cart, removeFromCart } = useContext(ProductsContext);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    if (cart.length === 0) {
      setOpen(false);
    }
  }, [cart]);

  return (
    <div
      className={`flex justify-between flex-col overflow-y-auto gap-4 p-4 fixed ${open ? "translate-x-0" : "translate-x-full"} ease-in-out duration-300 h-screen bg-white top-0 right-0 shadow-md border-l w-[25rem]`}
    >
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 cursor-pointer"
      >
        <XIcon />
      </button>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold border-b">Cart</h2>
        {cart.length === 0 ? (
          <div className="text-gray-500 text-center">Your cart is empty.</div>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="border h-fit rounded-lg shadow-sm">
              <div className="flex items-center gap-4 p-3">
                <div className="w-[5rem] h-fit border p-2 relative shadow-md flex items-center justify-center rounded-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="px-5 pb-2 w-full">
                <Button
                  onClick={() => removeFromCart(product.id)}
                  className="w-full bg-red-500 p-2 rounded-md shadow-md text-white cursor-pointer flex items-center justify-center gap-4"
                  // variant={"destructive"}
                >
                  <Trash2Icon />
                  Sterge
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-full p-2">
        <button
          onClick={() => setOpen(false)}
          className="bg-black w-full flex items-center justify-center gap-4 text-white p-2 rounded-lg cursor-pointer"
        >
          <XIcon />
          Inchide
        </button>
      </div>
    </div>
  );
}

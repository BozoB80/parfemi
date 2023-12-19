"use client"

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }  

  return (
    <div className="max-w-7xl mx-auto">
      {cart.items.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <h1>{item.priceVariant.label}</h1>
          <h1>{item.priceVariant.price}</h1>
        </div>
      ))}

      <Button size="icon" onClick={cart.removeAll}>Remove</Button>
    </div>
  );
}

export default CartPage;
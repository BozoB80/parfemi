"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="flex items-center py-10">
        <div className="flex flex-col">
          <div className="flex justify-start items-center gap-2">
            <Image src="/icons/cart.svg" alt="cart" width={28} height={28} />
            <h1 className="text-2xl font-medium">Tvoja košarica</h1>
            <p>({cart.items.length} artikla)</p>
          </div>

          <Table>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.images && item.images.length > 0 ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.title}
                        width={60}
                        height={60}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.priceVariant.label}</TableCell>
                  <TableCell>{item.priceVariant.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Button size="default" onClick={cart.removeAll}>
        Remove
      </Button>
    </div>
  );
};

export default CartPage;

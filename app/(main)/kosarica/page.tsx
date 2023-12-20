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
          <div className="w-full flex justify-between items-center border-b py-2">
            <div className="flex justify-start items-center gap-2">
              <Image src="/icons/cart.svg" alt="cart" width={28} height={28} />
              <h1 className="text-2xl font-medium">Tvoja košarica</h1>
              <p>({cart.items.length} {cart.items.length === 1 ? 'artikal' : 'artikla'})</p>
            </div>
            <Button size="sm" onClick={cart.removeAll}>
              Očisti košaricu
            </Button>
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
                  <TableCell className="flex flex-col justify-center items-start">
                    <p className="font-semibold">{item.brand?.label}</p>
                    <p>{item.title}</p></TableCell>
                  <TableCell>{item.priceVariant.label}</TableCell>
                  <TableCell>{item.priceVariant.price.toFixed(2)} KM</TableCell>
                  <TableCell>{item.quantity} kom</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

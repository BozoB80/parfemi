"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex py-5 sm:py-10">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center border-b max-lg:px-2 py-2">
            <div className="flex justify-start items-center gap-2">
              <Image src="/icons/cart.svg" alt="cart" width={28} height={28} />
              <h1 className="text-md sm:text-2xl font-medium">
                Tvoja košarica
              </h1>
              <p>
                ({cart.items.length}{" "}
                {cart.items.length === 1 ? "artikal" : "artikla"})
              </p>
            </div>
            {cart.items.length > 0 && (
              <Button size="sm" onClick={cart.removeAll}>
                Očisti košaricu
              </Button>
            )}
          </div>

          {cart.items.length === 0 ? (
            <div className="w-full h-full py-32 flex flex-col justify-center items-center space-y-6">
              <Image src="/icons/cart.svg" alt="cart" width={56} height={56} />
              <p className="text-3xl font-bold text-center">
                Košarica je prazna
              </p>
              <Link
                href="/parfemi"
                className="underline underline-offset-2 text-primary hover:text-primary/60 text-md md:text-xl"
              >
                Pregledajte top proizvode iz našeg asortimana
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artikal</TableHead>
                  <TableHead>J.mj.</TableHead>
                  <TableHead>Cijena</TableHead>
                  <TableHead>Količina</TableHead>
                  <TableHead>Ukupno</TableHead>
                  <TableHead>Ukloni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex justify-start items-center space-x-4">
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
                      <div>
                        <p className="font-semibold">{item.brand?.label}</p>
                        <p>{item.title}</p>
                      </div>
                    </TableCell>

                    <TableCell>{item.priceVariant.label}</TableCell>
                    <TableCell>
                      {item.priceVariant.price.toFixed(2)} KM
                    </TableCell>
                    <TableCell>{item.quantity} kom</TableCell>
                    <TableCell>
                      {(item.priceVariant.price * item.quantity).toFixed(2)} KM
                    </TableCell>
                    <TableCell>
                      <Trash2
                        className="cursor-pointer hover:text-red-400 transition"
                        onClick={() => cart.removeItem(item.id, toast)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {cart.items.length > 0 && (
          <div className="w-1/3 pl-3 flex flex-col justify-start items-start">
            <div className="w-full flex justify-center items-center gap-2 py-2.5 border-b">
              <Image
                src="/icons/orders.svg"
                alt="orders"
                width={24}
                height={24}
              />
              <h1 className="text-md sm:text-2xl font-medium">Narudžba</h1>
            </div>
            <div className="w-full flex flex-col justify-end items-end py-4">
              <h1>Cijena bez popusta:</h1>
              <h1>Popust</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

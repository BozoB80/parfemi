'use client'

import useCart from "@/hooks/use-cart";
import { Brand, Category, Image, PriceVariant, Product } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { MouseEvent } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

interface AddToCartProps {
  product: (Product & {
    images: Image[];
    category: Category | null;
    brand: Brand | null;
    priceVariant: PriceVariant;
  })
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddToCartButton = ({ product, onClick }: AddToCartProps) => {
  const { addItem } = useCart()
  const { toast } = useToast()

  const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, toast)
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <Button size="lg" onClick={onAdd} className="p-2 rounded-sm flex justify-center items-center font-semibold text-lg">
      <ShoppingBag className="w-4 h-4 mr-2" />
      <p>Dodaj u košaricu</p>
    </Button>
  );
}

export default AddToCartButton;
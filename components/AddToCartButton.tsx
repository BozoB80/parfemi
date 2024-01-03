'use client'

import useCart from "@/hooks/use-cart";
import { Brand, Category, Image as Images, PriceVariant, Product } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { MouseEvent, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

interface AddToCartProps {
  product: (Product & {
    images: Images[];
    category: Category | null;
    brand: Brand | null;
    priceVariant: PriceVariant;
  })
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const AddToCartButton = ({ product, onClick }: AddToCartProps) => {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const onAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, toast, quantity);
    setQuantity(1);
    if (onClick) {
      onClick(e);
    }
  }

  const handleMinus = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handlePlus = () => {
    setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
  };

  return (
    <div className="flex justify-center sm:justify-start items-center gap-4">
      <Button size="icon" variant="outline" onClick={handleMinus} className="text-lg"><Image src="/icons/minus.svg" alt="plus" width={20} height={20} /></Button>
      <span className="text-lg">{quantity}</span>
      <Button size="icon" variant="outline" onClick={handlePlus} className="text-lg"><Image src="/icons/plus.svg" alt="plus" width={20} height={20} /></Button>
      <Button size="lg" onClick={onAdd} className="p-2 rounded-sm flex justify-center items-center font-semibold text-lg">
        <ShoppingBag className="w-4 h-4 mr-2" />
        <p>Dodaj u košaricu</p>
      </Button>
    </div>
  );
}

export default AddToCartButton;
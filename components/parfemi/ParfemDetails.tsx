"use client";

import {
  Brand,
  Category,
  Image as Images,
  PriceVariant,
  Product,
} from "@prisma/client";
import { Separator } from "../ui/separator";
import Image from "next/image";
import CarouselPage from "../Carousel";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DetailsProps {
  parfem:
    | (Product & {
        images: Images[];
        category: Category | null;
        brand: Brand | null;
        priceVariants: PriceVariant[];
      })
    | null;
}

const ParfemDetails = ({ parfem }: DetailsProps) => {
  const [selectedPriceVariant, setSelectedPriceVariant] =
    useState<PriceVariant | null>(null);

  const handlePriceVariantClick = (price: PriceVariant) => {
    setSelectedPriceVariant((prevSelected) => (prevSelected === price ? null : price));
  };

  const addToCart = () => {
    // Implement your logic to add the selected item to the cart
    if (selectedPriceVariant) {
      // Example: You might want to dispatch an action to add to the cart here
      console.log("Adding to cart:", parfem?.title, selectedPriceVariant.label);
    }
  };

  return (
    <div>
      <Separator />
      <div className="py-2 sm:py-4 flex justify-center sm:justify-between items-center">
        <Link
          href={`/brend/${parfem?.brand?.label
            .toLowerCase()
            .replace(/\s/g, "-")}`}
        >
          <Image
            src={parfem?.brand?.logo || ""}
            alt={parfem?.title || ""}
            width={200}
            height={100}
            className="hover:scale-105 transition duration-500"
          />
        </Link>
        <div className="hidden sm:flex flex-col items-end">
          <h1 className="font-semibold capitalize">
            {parfem?.category?.label}
          </h1>
          <h1 className="font-bold text-xl">{parfem?.title}</h1>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="p-2">
          {parfem?.images ? (
            <CarouselPage baneri={parfem?.images} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="p-2">
          <h1 className="flex justify-center items-center md:hidden text-xl font-bold underline underline-offset-4 mb-4">
            {parfem?.title}
          </h1>
          <div>
            <p className="font-semibold text-lg">Opis:</p>
            <h1 className="text-sm md:text-base">{parfem?.description}</h1>
          </div>

          <h3 className="pt-3">Izaberite vaš parfem:</h3>
          <div className=" grid grid-cols-3 gap-3">
            {parfem?.priceVariants.map((price) => (
              <div
                key={price.id}
                onClick={() => handlePriceVariantClick(price)}
                className={cn(
                  "flex flex-col items-start space-x-2 border rounded-md p-3 cursor-pointer hover:border-primary transition hover:font-semibold",
                  selectedPriceVariant === price && "bg-primary text-white"
                )}
              >
                <h1 className="text-xs">{parfem.title}</h1>
                <h2 className="w-full text-end pr-3">{price.label}</h2>
              </div>
            ))}
          </div>
          {selectedPriceVariant && (
            <div className="mt-4 flex justify-center items-center gap-3 border py-4">
              <p className="text-green-500">Dostupno</p>
              <Separator orientation="vertical" className="h-full" />
              <p className="font-medium">Cijena vašeg parfema:</p>
              <p className="text-xl font-bold">KM {selectedPriceVariant.price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParfemDetails;

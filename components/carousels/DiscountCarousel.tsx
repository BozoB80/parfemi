"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Brand,
  Category,
  Image as Images,
  PriceVariant,
  Product,
} from "@prisma/client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useState } from "react";

interface DiscountProps {
  products: (Product & {
    images: Images[];
    category: Category | null;
    brand: Brand | null;
    priceVariants: PriceVariant[];
  })[];
}

const DiscountMain = ({ products }: DiscountProps) => {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const onShowDetails = (productId: string) => {
    setHoveredProductId(productId);
  };

  const onHideDetails = () => {
    setHoveredProductId(null);
  };

  return (
    <div className="max-w-7xl mx-auto pb-10 relative max-xl:px-1">
      <h1 className="uppercase text-lg md:text-2xl font-semibold max-lg:pl-2">
        Parfemi na akciji:
      </h1>
      <Carousel
        opts={{
          loop: "true",
        }}
        className="max-w-7xl mx-auto"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
              <Link
                href={`/parfemi/${product.category?.label.replace(
                  /\s/g,
                  "-"
                )}/${product.title.toLowerCase().replace(/\s/g, "-")}`}
                onMouseEnter={() => onShowDetails(product.id)}
                onMouseLeave={onHideDetails}
                className="relative"
              >
                <Image
                  src={product.images[0].url || ""}
                  alt={product.id}
                  width={1000}
                  height={1000}
                  quality={100}
                  priority
                  className="h-40 lg:h-80 object-contain object-center"
                />
                <Badge className="absolute top-0 left-0 aspect-square text-sm md:text-xl">
                  {product.discount}%
                </Badge>
                {hoveredProductId === product.id && (
                  <div
                    className={cn(
                      "hidden lg:block absolute bottom-0 w-full bg-secondary/70 h-fit space-y-2",
                      hoveredProductId === product.id &&
                        "transition-all duration-500 ease-out"
                    )}
                  >
                    <h1 className="text-center font-semibold pb-3">
                      {product.title}
                    </h1>
                    {product.priceVariants
                      .sort((a, b) => a.price - b.price)
                      .map((item) => (
                        <div key={item.id} className="grid grid-cols-4 px-2">
                          <h1 className="font-bold">{item.label}:</h1>
                          <h2 className="line-through">{item.price} KM</h2>
                          <Badge
                            variant="default"
                            className="col-span-2 flex justify-center text-sm"
                          >
                            {(
                              (item.price * (100 - (product?.discount ?? 0))) /
                              100
                            ).toFixed(2)}{" "}
                            KM
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
                {product.priceVariants
                  .sort((a, b) => a.price - b.price)
                  .slice(0, 1)
                  .map((item) => (
                    <div key={item.id} className="md:hidden flex justify-around text-xs">
                      <h2 className="text-secondary-foreground/60 line-through">{item.price} KM</h2>
                      <h2 className="col-span-2 flex justify-center">
                        {(
                          (item.price * (100 - (product?.discount ?? 0))) /
                          100
                        ).toFixed(2)}{" "}
                        KM
                      </h2>
                    </div>
                  ))}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="max-sm:hidden -top-4 left-auto right-12 content-end" />
        <CarouselNext className="max-sm:hidden -top-4 right-0" />
      </Carousel>
    </div>
  );
};

export default DiscountMain;

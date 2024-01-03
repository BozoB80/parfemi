import { Brand, Category, Image as Images, PriceVariant, Product } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import WishlistButton from "../WishlistButton";
import { Separator } from "../ui/separator";

interface ParfemCardProps {
  parfem: Product & {
    images: Images[]
    category: Category | null
    brand: Brand | null
    priceVariants: PriceVariant[]
  }
}

const ParfemCard = ({ parfem }: ParfemCardProps) => {
  const firstImageUrl = parfem.images.length > 0 ? parfem.images[0].url : '';

  return (
    <Card className="group cursor-pointer shadow-lg relative">
      <CardHeader className="p-0 py-3">
        <Link href={`/parfemi/${parfem.category?.label.replace(/\s/g, '-')}/${parfem.title.toLowerCase().replace(/\s/g, '-')}`} className="overflow-hidden">
          <Image 
            src={firstImageUrl}
            alt={parfem.title}
            width={500}
            height={500}
            className="aspect-square object-contain hover:scale-105 transition duration-400 rounded-sm hover:rounded-sm"
          />
        </Link>
      </CardHeader>
      {parfem.discount ? (
        <Badge className="absolute top-0 left-0 aspect-square text-sm md:text-xl">
          {parfem.discount}%
        </Badge>
      ) : ""}
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition ease-in-out duration-500">
        <WishlistButton product={parfem} />
      </div>
      <CardContent className="text-center p-0 py-2">
        <Link href={`/brend/${parfem.brand?.label.toLowerCase().replace(/\s/g, '-')}`} className="text-xl font-bold">{parfem.brand?.label}</Link>
        <p className="text-sm sm:text-base truncate px-1">{parfem.title}</p>
      </CardContent>
      <CardFooter className="flex justify-center max-lg:px-0.5 max-lg:py-2 px-0.5 gap-1">
        {
          parfem.discount && parfem?.discount > 0 ? (
            parfem.priceVariants
              .sort((a, b) => a.price - b.price)
              .slice(0, 1)
              .map((item) => (
                <div key={item.id} className="flex items-center gap-1 sm:gap-3 md:px-4 py-1 sm:py-2 rounded-md">
                  <p className="text-xs md:text-sm">{item.label}</p>
                  <Separator orientation="vertical" className="h-4 sm:h-5 w-0.5" />
                  <div className="flex gap-1 sm:gap-3">
                    <p className="text-xs md:text-sm text-red-500 line-through">{item.price.toFixed(2)}</p>
                    <p className="text-xs md:text-sm">{(item.price - (item.price * (parfem.discount ?? 0)) / 100).toFixed(2)} KM</p>
                  </div>
                </div>
              ))
          ) : (
            parfem.priceVariants
              .sort((a, b) => a.price - b.price)
              .slice(0, 1)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-center gap-3 px-2 md:px-4 py-1 sm:py-2 rounded-md">
                  <p className="text-xs md:text-sm">{item.label}</p>
                  <Separator orientation="vertical" className="h-4 sm:h-5 w-0.5" />
                  <p className="text-xs md:text-sm">{item.price.toFixed(2)} KM</p>
                </div>
              ))
          )
        }
      </CardFooter>
    </Card>
  );
}

export default ParfemCard;
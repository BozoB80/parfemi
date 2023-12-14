import { Brand, Category, Image as Images, PriceVariant, Product } from "@prisma/client";
import { Separator } from "../ui/separator";
import Image from "next/image";
import CarouselPage from "../Carousel";

interface DetailsProps {
  parfem: Product & {
    images: Images[]
    category: Category | null
    brand: Brand | null
    priceVariants: PriceVariant[]
  } | null
}

const ParfemDetails = ({ parfem }: DetailsProps) => {
  return (
    <div>
      <Separator />
      <div className="py-2 sm:py-4 flex justify-center sm:justify-between items-center">
        <Image 
          src={parfem?.brand?.logo || ""}
          alt={parfem?.title || ""}
          width={200}
          height={100}
        />
        <div className="hidden sm:flex flex-col items-end">
          <h1 className="font-semibold">{parfem?.category?.label}</h1>
          <h1 className="font-bold text-xl">{parfem?.title}</h1>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
          {parfem?.images ? (
            <CarouselPage baneri={parfem?.images} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>Description</div>
      </div>
    </div>
  );
}

export default ParfemDetails;
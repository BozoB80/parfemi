import { Brand, Category, Image as Images, PriceVariant, Product } from "@prisma/client";
import { Separator } from "../ui/separator";
import Image from "next/image";
import CarouselPage from "../Carousel";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";

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
        <Link href={`/brend/${parfem?.brand?.label.toLowerCase().replace(/\s/g, '-')}`}>
          <Image 
            src={parfem?.brand?.logo || ""}
            alt={parfem?.title || ""}
            width={200}
            height={100}
            className="hover:scale-105 transition duration-500"
          />
        </Link>
        <div className="hidden sm:flex flex-col items-end">
          <h1 className="font-semibold capitalize">{parfem?.category?.label}</h1>
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
        <div>
          <h1>{parfem?.description}</h1>
          <h1>{parfem?.title}</h1>
          {parfem?.priceVariants.map((price) => (
            <Checkbox key={price.id} id={price.id} />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default ParfemDetails;
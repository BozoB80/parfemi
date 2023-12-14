import { Brand, Category, Image as Images, PriceVariant, Product } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

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
    <Card className="shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/brend/${parfem.id.toLowerCase().replace(/\s/g, '-')}`} className="overflow-hidden">
          <Image 
            src={firstImageUrl}
            alt={parfem.title}
            width={500}
            height={500}
            className="hover:scale-110 transition duration-500 rounded-sm hover:rounded-sm"
          />
        </Link>
      </CardHeader>
      <CardContent className="text-center">
        <Link href={`/brend/${parfem.brand?.label.toLowerCase().replace(/\s/g, '-')}`} className="text-lg font-bold">{parfem.brand?.label}</Link>
        <p>{parfem.title}</p>
      </CardContent>
      <CardFooter className="flex justify-around">
        {parfem.priceVariants.map((item) => (
          <div key={item.id} className="border px-4 py-2 rounded-md">
            <p className="text-sm">{item.label}</p>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

export default ParfemCard;
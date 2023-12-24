"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";

interface BrandsProps {
  brands: Brand[]
}

const BrandsCarousel = ({ brands }: BrandsProps) => {
  const router = useRouter()

  return (
    <Carousel 
      opts={{
        loop: 'true',
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          jump: 'true',
          stopOnMouseEnter: 'true'
        })
      ]}
      className="max-w-7xl mx-auto py-10"
    >
      <CarouselContent>
        {brands.map((item) => (
          <CarouselItem key={item.id} className="basis-1/3 lg:basis-1/5">
            <Image 
              src={item.logo || ''}
              alt={item.id}
              width={200}
              height={100}
              onClick={() => router.push(`/brend/${item.label.toLowerCase().replace(/\s/g, '-')}`)}
              className="w-full h-6 sm:h-10 object-contain object-center cursor-pointer"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default BrandsCarousel;
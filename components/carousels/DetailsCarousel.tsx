"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type CarouselProps = {
  images: {
    id: string,
    imageUrl?: string,
    url?: string
  } []
}

const DetailsCarousel = ({ images }: CarouselProps) => {
  return (
    <Carousel 
      opts={{
        loop: 'true',
      }}
    >
      <CarouselContent>
        {images.map((item) => (
          <CarouselItem key={item.id}>
            <Image 
              src={item.url || ''}
              alt={item.id}
              width={500}
              height={250}
              className="w-full aspect-square object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-sm:hidden" />
      <CarouselNext className="max-sm:hidden" />
    </Carousel>
  );
}

export default DetailsCarousel;
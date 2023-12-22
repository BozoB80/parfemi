"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

interface BannerProps {
  baneri: {
    id: string,
    imageUrl?: string,
    url?: string
  } []
}

const HeroCarousel = ({ baneri }: BannerProps) => {
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
      className="max-w-7xl mx-auto"
    >
      <CarouselContent>
        {baneri.map((item) => (
          <CarouselItem key={item.id}>
            <Image 
              src={item.imageUrl || ''}
              alt={item.id}
              width={1000}
              height={500}
              className="w-full h-60 sm:h-80 lg:h-96 xl:h-[500px] object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-5" />
      <CarouselNext className="absolute right-5" />
    </Carousel>
  );
}

export default HeroCarousel;
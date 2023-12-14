"use client"

import { cn } from "@/lib/utils";
import { Baner } from "@prisma/client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface CarouselProps {
  baneri: {
    id: string,
    imageUrl?: string,
    url?: string
  } []
  height?: boolean
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const CarouselPage = ({ baneri, height }: CarouselProps) => {
  return (
    <Carousel
      swipeable={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={6000}
      customTransition="all 2s"
      transitionDuration={2000}   
      arrows={responsive.mobile ? false : true}
    >
      {baneri.map((baner) => (
        <Image 
          key={baner.id}
          src={baner.imageUrl || baner.url || ""}
          alt={baner.id}
          width={5000}
          height={5000}
          quality={100}
          priority
          className={cn("w-full sm:h-80 lg:h-96 xl:h-[650px] object-cover object-center", height && "h-48")}
        />
      ))}
    </Carousel>
  );
}

export default CarouselPage;
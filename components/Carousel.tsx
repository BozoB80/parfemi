"use client"

import { Baner } from "@prisma/client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface CarouselProps {
  baneri: Baner[]
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

const CarouselPage = ({ baneri }: CarouselProps) => {
  return (
    <Carousel
      swipeable={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      customTransition="all 2s"
      transitionDuration={2000}      
    >
      {baneri.map((baner) => (
        <Image 
          key={baner.id}
          src={baner.imageUrl}
          alt={baner.id}
          width={1000}
          height={1000}
          className="w-full h-48 sm:h-80 lg:h-96 xl:h-[650px] object-cover object-center"
        />
      ))}
    </Carousel>
  );
}

export default CarouselPage;
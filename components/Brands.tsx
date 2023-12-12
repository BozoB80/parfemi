"use client"

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Brand } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BrandsProps {
  brands: Brand[]
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Brands = ({ brands }: BrandsProps) => {
  const router = useRouter()

  return (
    <Carousel
      swipeable={true}
      responsive={responsive}
      ssr={true}
      arrows={false}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      customTransition="all 2s linear"
      transitionDuration={2000}    
      className="max-w-7xl mx-auto my-3 sm:my-10"  
    >
      {brands.map((brand) => (
        <Image 
          key={brand.id}
          src={brand.logo}
          alt={brand.id}
          width={200}
          height={100}
          onClick={() => router.push(`/brend/${brand.label.toLowerCase().replace(/\s/g, '-')}`)}
          className="w-full h-6 sm:h-10 object-contain object-center cursor-pointer dark:invert"
        />
      ))}
    </Carousel>
  );
}

export default Brands;
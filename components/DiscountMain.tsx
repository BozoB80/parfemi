"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Brand,
  Category,
  Image as Images,
  PriceVariant,
  Product,
} from "@prisma/client";
import Image from "next/image";

interface DiscountProps {
  products: (Product & {
    images: Images[];
    category: Category | null;
    brand: Brand | null;
    priceVariants: PriceVariant[];
  })[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const DiscountMain = ({ products }: DiscountProps) => {
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Carousel
        swipeable={true}
        responsive={responsive}
        infinite={true}
        arrows
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {products.map((product) => (
          <Image
            key={product.id}
            src={product.images[0].url || ""}
            alt={product.id}
            width={1000}
            height={1000}
            quality={100}
            priority
            className="h-40 lg:h-80 object-contain object-center"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default DiscountMain;

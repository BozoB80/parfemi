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
    items: 3,
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
    <div className="max-w-7xl mx-auto pb-10 relative">
      <h1 className="uppercase text-xl font-semibold">Akcija</h1>
      <Carousel
        arrows={false}
        centerMode
        customButtonGroup={<ButtonGroup />}
        draggable
        infinite
        minimumTouchDrag={80}
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        renderButtonGroupOutside
        slidesToSlide={2}
        swipeable
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

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="absolute right-0 top-0 flex gap-2"> 
      <Image src="icons/arrow-left.svg" alt="arrowleft" width={40} height={40} className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} />
      <Image src="icons/arrow-left.svg" alt="arrowright" width={40} height={40} className="rotate-180" onClick={() => next()} />
    </div>
  );
};

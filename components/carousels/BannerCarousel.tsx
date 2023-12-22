"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image"
import { Baner } from "@prisma/client";

interface BannerProps {
  baneri: {
    id: string,
    imageUrl?: string,
    url?: string
  } []
}

const BannerCarousel = ({ baneri }: BannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const autoScroll = true
  const slideIntervalRef = useRef<any>(null);
  let intervalTime = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === baneri.length - 1 ? 0 : prevSlide + 1));
  }, [baneri.length]);
  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? baneri.length - 1 : currentSlide - 1)
  }

  useEffect(() => {
    setCurrentSlide(0)
  }, [])


  useEffect(() => {
    if (autoScroll) {
      const autoMove = () => {
        slideIntervalRef.current = setInterval(nextSlide, intervalTime)
      };
      autoMove()
    }
    return () => clearInterval(slideIntervalRef.current)
  }, [currentSlide, autoScroll, intervalTime, nextSlide])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-full overflow-clip h-60 sm:h-80 lg:h-96 xl:h-[500px]">
        <div onClick={previousSlide}>
          <Image src="/icons/arrow-left.svg" alt="leftarrow" width={40} height={40} className="absolute top-[50%] left-6 z-10 -translate-y-1/2 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 active:scale-90 transition-all" />
        </div>
        <div onClick={nextSlide}>
          <Image src="/icons/arrow-left.svg" alt="rightarrow" width={40} height={40} className="absolute rotate-180 top-[50%] right-6 z-10 -translate-y-1/2 sm:w-10 sm:h-10 cursor-pointer hover:scale-110 active:scale-90 transition-all" />
        </div>
        {baneri.map((item, index) => (
          <div key={index} className={`absolute top-0 left-0 w-[150%] md:w-full h-full opacity-0 transition-all ease-out ${index === currentSlide ? 'opacity-100' : ''}`}>
            {index === currentSlide && (
              <Image 
                src={item.imageUrl || ''}
                alt="slide"
                width={1000}
                height={500}
                className="w-full h-60 sm:h-80 lg:h-96 xl:h-[500px] object-cover object-center"                
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BannerCarousel;
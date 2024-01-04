"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer"

type Props = {
  onLoadMore: () => void;
}

function LoadMore({ onLoadMore }: Props) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      onLoadMore()
    }
  }, [inView, onLoadMore])
  

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
"use client"

import { inclusions } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <footer className="w-full flex flex-col">
      {isHomePage && (
        <div className="max-xl:px-5 max-w-7xl py-10 mx-auto w-full grid grid-cols-2 sm:grid-cols-4 justify-between items-center gap-4">
          {inclusions.map((item) => (
            <div key={item.title}>
              <Image src={item.icon} alt="icon" width={40} height={40} className="dark:invert" />
              <h1 className="font-bold text-base lg:text-xl">{item.title}</h1>
              <p className="max-lg:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className={cn("bg-black w-full px-5 py-2 sm:p-10 flex flex-col justify-between items-center",
      !isHomePage && "mt-8")}>
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <Image 
              src="/logo-dark.png"
              alt="logo"
              width={150}
              height={80}
            />
          </Link>
          <h1 className="text-white/90 max-lg:text-sm max-sm:hidden">Copyright © L&apos;Aurora Parfums {new Date().getFullYear()}. Sva prava pridržana.</h1>
          <div className="flex items-center gap-2 sm:gap-8">
            <Link href="/">
              <Image 
                src="/facebook.svg"
                alt="facebook"
                width={30}
                height={30}
                className="hover:scale-110 transition"
              />
            </Link>
            <Link href="/">
              <Image 
                src="/instagram.svg"
                alt="instagram"
                width={30}
                height={30}
                className="hover:scale-110 transition"
              />
            </Link>
            <Link href="/">
              <Image 
                src="/twitter.svg"
                alt="twitter"
                width={30}
                height={30}
                className="hover:scale-110 transition"
              />
            </Link>
          </div>
        </div>
        <h1 className="text-white/90 text-xs mt-2 sm:hidden">Copyright © PARFEMI {new Date().getFullYear()}. Sva prava pridržana.</h1>
      </div>
    </footer>
  );
};

export default Footer;

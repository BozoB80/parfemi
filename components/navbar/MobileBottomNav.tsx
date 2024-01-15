"use client"

import useCart from "@/hooks/use-cart";
import { debounce } from "@/lib/debounce";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Backpack, CircleUser, Codesandbox, Home, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MobileBottomNav = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false)
  const [activeButton, setActiveButton] = useState('Home')

  const router = useRouter()
  const pathname = usePathname()
  const isParfemiScreen = pathname.includes('/parfemi')
  const isBrendScreen = pathname.match('/brend')
  const user = useUser()
  const cart = useCart()

  useEffect(() => {
    pathname === '/' && setActiveButton('Home')
    pathname === '/parfemi' && setActiveButton('Parfemi')
    pathname === '/brend' && setActiveButton('Brend')
    pathname === '/racun' && setActiveButton('Racun')
    pathname === '/kosarica' && setActiveButton('Kosarica')
  }, [pathname])
  

  const homeLink = () => {
    router.push('/')
    setActiveButton('Home')
  }

  const parfemiLink = () => {
    router.push('/parfemi')
    setActiveButton('Parfemi')
  }

  const brandLink = () => {
    router.push('/brend')
    setActiveButton('Brend')
  }
  
  const profileLink = () => {
    user ? router.push('/racun') : router.push('/sign-in')
    setActiveButton('Racun')
  }

  const cartLink = () => {
    user ? router.push('/kosarica') : router.push('/sign-in')
    setActiveButton('Kosarica')
  }

  const handleScroll = debounce({
    func: () => {
      const currentScrollPos = window.scrollY;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      // Adjust the visibility logic based on the navbar height (64px) and document height
      setVisible(currentScrollPos > 64 || documentHeight < window.innerHeight * 1.5);

      setPrevScrollPos(currentScrollPos);
    },
    wait: 50,
    immediate: false,
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section className="flex sm:hidden">
      <div className={`flex fixed ${visible ? 'bottom-0 z-50' : '-bottom-96 -z-50'} bg-white shadow-black shadow-2xl w-full justify-around items-center py-3`}>
        <Link href="/" onClick={homeLink} className="flex flex-col justify-center items-center">
          <Home size={24} className={cn("transition-all duration-300", activeButton === 'Home' && 'text-primary')} />
          <p className={cn("text-xs", activeButton === 'Home' && 'font-semibold text-primary')}>Početna</p>
        </Link>
        <div onClick={parfemiLink} className="flex flex-col justify-center items-center">
          <Backpack size={24} className={cn("transition-all duration-300", activeButton === 'Parfemi' && 'text-primary')} />
          <p className={cn("text-xs", activeButton === 'Parfemi' && 'font-semibold text-primary')}>Parfemi</p>
        </div>
        <div onClick={brandLink} className="flex flex-col justify-center items-center">
          <Codesandbox size={24} className={cn("transition-all duration-300", activeButton === 'Brend' && 'text-primary')} />
          <p className={cn("text-xs", activeButton === 'Brend' && 'font-semibold text-primary')}>Brend</p>
        </div>
        <div onClick={profileLink} className="flex flex-col justify-center items-center">
          <CircleUser size={24} className={cn("transition-all duration-300", activeButton === 'Racun' && 'text-primary')} />
          <p className={cn("text-xs", activeButton === 'Racun' && 'font-semibold text-primary')}>Moj profil</p>
        </div>
        <div onClick={cartLink} className="flex flex-col justify-center items-center">
          <div className="relative">
            <ShoppingCart size={24} className={cn("transition-all duration-300", activeButton === 'Kosarica' && 'text-primary')} />
            <span className="absolute -top-2 -right-3 flex h-5 w-5">
              <span className={cn("absolute inline-flex h-full w-full rounded-full bg-primary opacity-75",
                cart.items.length > 0 && "animate-ping"  
              )} />
              <span className="relative flex justify-center items-center text-base font-bold rounded-full h-5 w-5 bg-primary">{cart.items.length}</span>
            </span>
          </div>
          <p className={cn("text-xs", activeButton === 'Kosarica' && 'font-semibold text-primary')}>Košarica</p>
        </div>
      </div>    
    </section>      
  );
}

export default MobileBottomNav;
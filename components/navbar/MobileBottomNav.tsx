"use client"

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
          <Home className={cn("w-5 h-5 transition-all duration-300", activeButton === 'Home' && 'fill-primary')} />
          <p className="text-xs">Početna</p>
        </Link>
        <div onClick={parfemiLink} className="flex flex-col justify-center items-center">
          <Backpack className={cn("w-5 h-5 transition-all duration-300", activeButton === 'Parfemi' && 'fill-primary')} />
          <p className="text-xs">Parfemi</p>
        </div>
        <div onClick={brandLink} className="flex flex-col justify-center items-center">
          <Codesandbox className={cn("w-5 h-5 transition-all duration-300", activeButton === 'Brend' && 'fill-primary')} />
          <p className="text-xs">Brend</p>
        </div>
        <div onClick={profileLink} className="flex flex-col justify-center items-center">
          <CircleUser className={cn("w-5 h-5 transition-all duration-300", activeButton === 'Racun' && 'fill-primary')} />
          <p className="text-xs">Moj profil</p>
        </div>
        <div onClick={cartLink} className="flex flex-col justify-center items-center">
          <ShoppingCart className={cn("w-5 h-5 transition-all duration-300", activeButton === 'Kosarica' && 'fill-primary')} />
          <p className="text-xs">Košarica</p>
        </div>
      </div>    
    </section>      
  );
}

export default MobileBottomNav;
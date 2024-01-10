"use client"

import { Button } from "../ui/button";
import { Brand, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface MainNavProps {
  brendovi: Brand[]
  kategorije: Category[]
}

const MainNav = ({ brendovi, kategorije }: MainNavProps) => {
  const [open, setOpen] = useState(false)
  const [openBrend, setOpenBrend] = useState(false)
  const router = useRouter()

  

  return (
    <div className="hidden max-w-7xl mx-auto md:flex justify-between items-center space-x-3">
      <Link href="/parfemi">
        <Button variant="ghost" className="uppercase text-md hover:bg-white/30">Parfemi</Button>
      </Link>

      <HoverCard open={open} onOpenChange={setOpen} openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="uppercase text-md hover:bg-white/30">Kategorije</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-full flex flex-col p-4 gap-4">
          {kategorije.map((kategorija) => {
            const handleClick = () => {
              router.push(`/parfemi/${kategorija.label.toLowerCase().replace(/\s/g, "-")}`)
              setOpen(open => !open)
            }

            return (
              <div key={kategorija.id}>
                <div onClick={handleClick} className="flex justify-start items-center gap-8 border p-2 rounded-md hover:border-primary transition duration-500 cursor-pointer">
                  <Image 
                    src={kategorija.imageUrl}
                    alt={kategorija.label}
                    width={70}
                    height={70}
                    className="aspect-square object-cover"
                  />
                  <h1 className="uppercase font-semibold">{kategorija.label}</h1>
                </div>
              </div>
            )})}
        </HoverCardContent>
      </HoverCard>      

      <HoverCard open={openBrend} onOpenChange={setOpenBrend} openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="uppercase text-md hover:bg-white/30">Brendovi</Button>
        </HoverCardTrigger>
        <HoverCardContent className="space-y-2">
          {brendovi.map((brend) => {
            const handleClick = () => {
              router.push(`/brend/${brend.label.toLowerCase().replace(/\s/g, "-")}`)
              setOpenBrend(openBrend => !openBrend)
            }

            return (
            <h1 key={brend.id} onClick={handleClick} className="cursor-pointer hover:bg-primary-foreground">
              {brend.label}
            </h1>
          )})}
        </HoverCardContent>
      </HoverCard>
      
      <Button variant="ghost" onClick={() => router.push('/onama')} className="uppercase text-md hover:bg-white/30">O Nama</Button>
      <Button variant="ghost" onClick={() => router.push('/kontakt')} className="uppercase text-md hover:bg-white/30">Kontakt</Button>
      <Button variant="ghost" onClick={() => router.push('/racun')} className="uppercase text-md hover:bg-white/30">Moj račun</Button>
    </div>
  );
}

export default MainNav;
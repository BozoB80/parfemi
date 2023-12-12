"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface MainNavProps {
  brendovi: Brand[]
}

const MainNav = ({ brendovi }: MainNavProps) => {
  const router = useRouter()

  return (
    <div className="hidden max-w-7xl mx-auto md:flex justify-between items-center space-x-3">
      <Button variant="ghost" className="uppercase text-md">Proizvodi</Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="uppercase text-md">Kategorije</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex p-4 space-x-10">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="border-b text-center">
              Men
            </DropdownMenuLabel>
            <DropdownMenuItem>
              Prvi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Drugi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Treći
            </DropdownMenuItem>
            <DropdownMenuItem>
              Četvrti
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel className="border-b text-center">
              Women
            </DropdownMenuLabel>
            <DropdownMenuItem>
              Prvi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Drugi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Treći
            </DropdownMenuItem>
            <DropdownMenuItem>
              Četvrti
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel className="border-b text-center">
              Unisex
            </DropdownMenuLabel>
            <DropdownMenuItem>
              Prvi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Drugi
            </DropdownMenuItem>
            <DropdownMenuItem>
              Treći
            </DropdownMenuItem>
            <DropdownMenuItem>
              Četvrti
            </DropdownMenuItem>
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>

      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="uppercase text-md">Brandovi</Button>
        </HoverCardTrigger>
        <HoverCardContent className="space-y-2">
          {brendovi.map((brend) => (
            <h1 key={brend.id} onClick={() => router.push(`/brend/${brend.label.toLowerCase().replace(/\s/g, '-')}`)} className="cursor-pointer hover:bg-primary-foreground">
              {brend.label}
            </h1>
          ))}
        </HoverCardContent>
      </HoverCard>
      
      <Button variant="ghost" className="uppercase text-md">O Nama</Button>
      <Button variant="ghost" className="uppercase text-md">Kontakt</Button>
      <Button variant="ghost" className="uppercase text-md">Moj račun</Button>
    </div>
  );
}

export default MainNav;
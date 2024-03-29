"use client";

import { Award, Backpack, BookMarked, Contact, Home, LogIn, LogOut, Menu, ShieldCheck, User2, UserCircle2 } from "lucide-react";
import { SignOutButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Brand, Category } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

interface MobileMenuProps {
  brendovi: Brand[];
  kategorije: Category[];
}

const MobileMenu = ({ brendovi, kategorije }: MobileMenuProps) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex sm:hidden items-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={34} className="mr-8" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              {user ? (
                <div className="flex items-center justify-start gap-2 pb-2">
                  <Image src={user.imageUrl} alt="user" width={35} height={35} className="rounded-full" />
                  <p className="text-md">{user.fullName}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/admin")}
                    className="lg:hidden text-md font-medium uppercase"
                  >
                    <ShieldCheck fill="red" className="h-6 w-6 mr-2" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant="link"
                    onClick={() => router.push("/sign-in")}
                    className="text-md font-medium gap-2 underline"
                  >
                    <UserCircle2 size={24} />
                    Prijava
                  </Button>
                </div>
              )}
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="max-h-full overflow-y-scroll">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <SheetClose
                onClick={() => router.push("/")}
                className="w-full flex justify-between items-center py-4 text-black font-medium"
              >
                Početna
                <Home size={20} />
              </SheetClose>
            </AccordionItem>

            <AccordionItem value="item-2">
              <SheetClose
                onClick={() => router.push("/parfemi")}
                className="w-full flex justify-between items-center py-4 text-black font-medium"
              >
                Parfemi
                <Backpack size={20} />
              </SheetClose>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Kategorije</AccordionTrigger>
              <ScrollArea className="max-h-64 overflow-y-scroll">
                <AccordionContent className="flex flex-col space-y-2">
                  {kategorije.map((item) => (
                    <SheetClose
                      key={item.id}
                      onClick={() =>
                        router.push(`/parfemi/${item.label.replace(/\s/g, "-")}`)
                      }
                      className="uppercase py-1"
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </AccordionContent>
              </ScrollArea>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Brendovi</AccordionTrigger>
              <ScrollArea className="max-h-64 overflow-y-scroll">
                <AccordionContent className="flex flex-col space-y-2">
                  {brendovi.map((item) => (
                    <SheetClose
                      key={item.id}
                      onClick={() =>
                        router.push(
                          `/brend/${item.label.toLowerCase().replace(/\s/g, "-")}`
                        )
                      }
                      className="uppercase py-1"
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </AccordionContent>
              </ScrollArea>
            </AccordionItem>

            <AccordionItem value="item-5">
              <SheetClose
                onClick={() => router.push("/racun")}
                className="w-full flex justify-between items-center py-4 text-black font-medium"
              >
                Moj račun
                <Award size={20} />
              </SheetClose>
            </AccordionItem>

            <AccordionItem value="item-6">
              <SheetClose
                onClick={() => router.push("/onama")}
                className="w-full flex justify-between items-center py-4 text-black font-medium"
              >
                O Nama
                <BookMarked size={20} />
              </SheetClose>
            </AccordionItem>

            <AccordionItem value="item-7">
              <SheetClose
                onClick={() => router.push("/kontakt")}
                className="w-full flex justify-between items-center py-4 text-black font-medium"
              >
                Kontakt
                <Contact size={20} />
              </SheetClose>
            </AccordionItem>

            <AccordionItem value="item-7">
              <SheetClose
                onClick={() => router.push("/")}
                className="w-full text-start py-4 text-black font-medium"
              >
                <SignedIn>
                  <SignOutButton signOutCallback={() => router.push("/")}>
                    <div className="flex justify-between items-center cursor-pointer gap-4">
                      <p className="">Odjava</p>
                      <LogOut size={20} />
                    </div>
                  </SignOutButton>
                </SignedIn>
              </SheetClose>
            </AccordionItem>          
          </Accordion>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;

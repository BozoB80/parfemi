"use client";

import { Menu, ShieldCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
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

interface MobileMenuProps {
  brendovi: Brand[]
  kategorije: Category[]
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {user ? (
                <div className="flex items-center justify-start gap-2 pb-2">
                  <UserButton afterSignOutUrl="/" />
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
                    className="text-md font-medium"
                  >
                    Moj račun
                  </Button>
                </div>
              )}
            </SheetTitle>
          </SheetHeader>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" onClick={() => router.push("/")}>
              <AccordionTrigger>
                <SheetClose>Početna</SheetClose>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="item-2" onClick={() => router.push("/parfemi")}>
              <AccordionTrigger>
                <SheetClose>Parfemi</SheetClose>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Kategorije</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                {kategorije.map((item) => (
                  <SheetClose key={item.id} onClick={() => router.push(`/parfemi/${item.label.replace(/\s/g, '-')}`)} className="uppercase py-1">
                    {item.label}
                  </SheetClose>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Brendovi</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-2">
                {brendovi.map((item) => (
                  <SheetClose key={item.id} onClick={() => router.push(`/brend/${item.label.toLowerCase().replace(/\s/g, '-')}`)} className="uppercase py-1">
                    {item.label}
                  </SheetClose>
                ))}
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;

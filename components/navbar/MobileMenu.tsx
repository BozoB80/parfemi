"use client";

import { Menu, ShieldCheck } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";


const MobileMenu = () => {
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
                <div className="flex items-center justify-start gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <p className="text-md">{user.username}</p>
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
          <SheetClose>
            <p>Početna</p>
          </SheetClose>
          <SheetClose>
            <p>Kategorije</p>
          </SheetClose>
          <SheetClose>
            <p>O Nama</p>
          </SheetClose>


          <Sheet>
            <div>
              {user && (
                <Button
                  variant="ghost"
                  onClick={() => router.push("/admin")}
                  className="lg:hidden text-md font-medium uppercase animate-bounce"
                >
                  <ShieldCheck fill="red" className="h-6 w-6 mr-2" />
                  Admin
                </Button>
              )}
            </div>
          </Sheet>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;

"use client";

import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="md:hidden">
      <div className="h-16 flex justify-between items-center border-b shadow-lg px-2">
        <Sheet>
          <SheetTrigger>
            <Menu size={34} />
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="">Nadzorna ploča</SheetTitle>
            <Separator className="my-4" />
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.route;

              return (
                <SheetClose key={link.label} asChild>
                  <Link                    
                    href={link.route}
                    className={`relative dark:text-white/80 flex justify-start gap-4 rounded-md p-4 ${
                      isActive && "bg-primary text-white/90 font-bold"
                    }`}
                  >
                    <link.icon className="w-6 h-6" />
                    <p className="font-medium text-lg">{link.label}</p>
                  </Link>
                </SheetClose>
              );
            })}

            <Separator className="my-4" />

            <SignedIn>
              <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                <div className="flex cursor-pointer gap-4 p-4 text-black dark:text-white/80">
                  <LogOut />
                  <p className="font-medium text-lg">Odjava</p>
                </div>
              </SignOutButton>
            </SignedIn>
          </SheetContent>
        </Sheet>
        <Image
          src={"/logo2.png"}
          alt="logo"
          width={150}
          height={150}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AdminNavbar;

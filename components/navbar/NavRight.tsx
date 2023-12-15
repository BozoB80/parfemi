"use client";

import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
//import MobileMenu from "./MobileMenu";
import { Search, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import NavCart from "./NavCart";
import WishlistButton from "../WishlistButton";

const NavRight = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="flex items-center space-x-1 lg:space-x-4">
      {user && (
        <Button
          variant="ghost"
          onClick={() => router.push("/admin")}
          className="max-md:hidden text-md font-medium uppercase"
        >
          <ShieldCheck fill="red" className="h-6 w-6 mr-2" />
          Admin
        </Button>
      )}
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>
      <div className="hidden sm:block">
        <WishlistButton />
      </div>
      <div className="sm:hidden">
        <Search size={24} />
      </div>
      <NavCart />

      <div className="max-lg:hidden">
        {user ? (  
          <UserButton afterSignOutUrl="/" />
        ) : (
          <div>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push("/sign-in")}
              className="text-md font-medium"
            >
              Prijava
            </Button>
          </div>
        )}
      </div>
      {/* <MobileMenu /> */}
    </div>
  );
};

export default NavRight;

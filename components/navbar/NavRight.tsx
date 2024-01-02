"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart, Search, ShieldCheck } from "lucide-react";

import { Button } from "../ui/button";
import NavCart from "./NavCart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const NavRight = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    const path = '/racun?tab=zelje'
    router.replace(path)
  }

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
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleClick}
              className="relative flex items-center"
            >
              <Heart size={28} className="hover:scale-105 hover:fill-green-500 transition ease-in-out duration-500" />          
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lista želja</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
    </div>
  );
};

export default NavRight;

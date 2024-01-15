"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart, ShieldCheck } from "lucide-react";

import { Button } from "../ui/button";
import NavCart from "./NavCart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Searchbar from "./Searchbar";

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
              className="relative hidden md:flex items-center"
            >
              <Heart size={28} className="hover:scale-105 hover:fill-primary transition ease-in-out duration-500" />          
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lista želja</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="sm:hidden">
        <Searchbar />       
      </div>
      <NavCart />

      <div className="max-lg:hidden">
        {user ? (  
          <div className="pl-2">
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonPopoverActionButton__manageAccount: "hidden" } }} />        
          </div>
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

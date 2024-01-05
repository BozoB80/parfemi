import useCart from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const NavCart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => router.push("/kosarica")}
            className="relative flex items-center"
          >
            <ShoppingCart size={24} className="hover:scale-105 hover:fill-primary transition" />
            <span className="absolute top-0 right-0 flex h-5 w-5">
              <span className={cn("absolute inline-flex h-full w-full rounded-full bg-primary opacity-75",
                cart.items.length > 0 && "animate-ping"  
              )} />
              <span className="relative flex justify-center items-center text-base font-bold rounded-full h-5 w-5 bg-primary">{cart.items.length}</span>
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Vaša košarica</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavCart;

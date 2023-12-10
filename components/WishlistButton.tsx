"use client";


import { Heart } from "lucide-react";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Form, FormField, FormItem } from "./ui/form";
// import axios from "axios";
// import { Game, Wishlist } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

// const formSchema = z.object({
//   isWishlisted: z.boolean().default(false),
//   gameId: z.string(),
// });

// interface WishlistButtonProps {
//   game: Game & {
//     wishlist?: Wishlist[];
//   };
// }

const WishlistButton = () => {
  const { toast } = useToast();
  const router = useRouter()
  const { user } = useUser()

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     isWishlisted: false,
  //     gameId: game.id,
  //   },
  // });

  // const isWished = game.wishlist?.some((item) => item.isWishlisted && item.userId === user?.id);
  
  // const onSubmit = async (data: z.infer<typeof formSchema>) => {
  //   try {
  //     if (!isWished) {
  //       data.isWishlisted = true;
  //       await axios.post("/api/wishlist", data);
  //       toast({ description: "Game added to wishlist" });
  //     } else {
  //       await axios.delete(`/api/wishlist/${game.id}`)
  //       toast({ variant: "destructive", description: "Game removed from wishlist" });
  //     }
  //     router.refresh()    
      
  //   } catch (error) {
  //     toast({ variant: "destructive", description: "Something went wrong" });
  //   }
  // };

  return (
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //     <FormField
    //       control={form.control}
    //       name="isWishlisted"
    //       render={({ field }) => (
    //         <FormItem>
              <Button
                size="icon"
                variant="ghost"
                type="submit"
                // value={field.value.toString()}
                // onChange={field.onChange}
                className="py-2 rounded-lg"
              >
                <Heart size={24} />
                {/* {isWished ? "Wishlisted" : "Wishlist it"} */}
              </Button>
    //         </FormItem>
    //       )}
    //     />
    //   </form>
    // </Form>
  );
};

export default WishlistButton;

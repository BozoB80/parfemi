"use client";

import { Heart } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Form, FormField, FormItem } from "./ui/form";
import { Product, Wishlist } from "@prisma/client";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const formSchema = z.object({
  isWishlisted: z.boolean().default(false),
  productId: z.string(),
});

interface WishlistButtonProps {
  product: Product & {
    wishlist?: Wishlist[];
  };
}

const WishlistButton = ({ product }: WishlistButtonProps) => {
  const { toast } = useToast();
  const router = useRouter()
  const { user } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isWishlisted: false,
      productId: product.id,
    },
  });

  const isWished = product?.wishlist?.some((item) => item.isWishlisted === true && item.userId === user?.id);
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (!isWished) {
        data.isWishlisted = true;
        await axios.post("/api/wishlist", data);
        toast({ description: "Dodano na vašu listu želja" });
      } else {
        await axios.delete(`/api/wishlist/${product.id}`)
        toast({ variant: "destructive", description: "Uklonjeno iz liste želja" });
      }
      router.refresh()    
      
    } catch (error) {
      toast({ variant: "destructive", description: "Greška" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="isWishlisted"
          render={({ field }) => (
            <FormItem>
              <Button
                size="icon"
                variant="ghost"
                type="submit"
                value={field.value.toString()}
                onChange={field.onChange}
                className="py-2 rounded-lg"
              >
                <Heart size={28} className={isWished ? "fill-primary text-primary" : ""} />
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default WishlistButton;

"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2, Trash2, Truck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useRouter } from "next/navigation";
 
const formSchema = z.object({
  name: z.string().min(5, { message: 'Unesite ime i prezime'}).max(30),
  phone: z.string().refine(value => /^(\+)?\d+$/.test(value), { message: 'Unesite broj telefona' }),
  address: z.string().min(5, { message: 'Unesite adresu'}).max(30),
  town: z.string().min(5, { message: 'Unesite grad'}).max(30),
  postal: z.coerce.number().min(1, { message: 'Unesite poštanski broj'}),
  payment: z.enum(["pouzecem", "karticom"], {
    required_error: "Izaberite način plaćanja.",
  }),
})

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const { toast } = useToast();  
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      town: '',
      postal: 0,
      payment: "pouzecem"
    },
  })

  const { isSubmitting } = form.formState
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const requestBody = {
        orderDetails: values,
        cartItems: cart.items,
      };

      await axios.post("/api/proizvodi/kosarica", requestBody)
      toast({ title: "Narudžba potvrđena", description: "Uspješno ste plasirali narudžbu." });
      cart.removeAll()
      router.refresh()
      router.push("/")

    } catch (error) {
      console.log(error);  
      toast({ variant: "destructive", description: "Narudžba nije poslana." })    
    }    
  }


  const totalAmount = cart.items.reduce((total, item) => total + item.priceVariant.price * item.quantity, 0)
  const totalPriceWithDiscount = cart.items.reduce((total, item) => total + ((item.priceVariant.price * (100 - (item?.discount ?? 0))) / 100) * item.quantity, 0)
  const totalDiscount = totalAmount - totalPriceWithDiscount
  const totalPriceWithDelivery = totalPriceWithDiscount + 10

  if (!isMounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>        
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col lg:flex-row py-5 sm:py-10">
            <div className="w-full flex flex-col">
              <div className="w-full flex justify-between items-center border-b max-lg:px-2 py-2">
                <div className="flex justify-start items-center gap-2">
                  <Image src="/icons/cart.svg" alt="cart" width={28} height={28} />
                  <h1 className="text-md sm:text-2xl font-medium">
                    Tvoja košarica
                  </h1>
                  <p>
                    ({cart.items.length}{" "}
                    {cart.items.length === 1 ? "artikal" : "artikla"})
                  </p>
                </div>
                {cart.items.length > 0 && (
                  <Button size="sm" onClick={cart.removeAll}>
                    Očisti košaricu
                  </Button>
                )}
              </div>

              {cart.items.length === 0 ? (
                <div className="w-full h-full py-32 flex flex-col justify-center items-center space-y-6">
                  <Image src="/icons/cart.svg" alt="cart" width={56} height={56} />
                  <p className="text-3xl font-bold text-center">
                    Košarica je prazna
                  </p>
                  <Link
                    href="/parfemi"
                    className="underline underline-offset-2 text-primary hover:text-primary/60 text-md md:text-xl"
                  >
                    Pregledajte top proizvode iz našeg asortimana
                  </Link>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artikal</TableHead>
                      <TableHead className="hidden md:block">J.mj.</TableHead>
                      <TableHead className="hidden md:block">Cijena</TableHead>
                      <TableHead className="hidden md:block">Popust</TableHead>
                      <TableHead>Količina</TableHead>
                      <TableHead>Ukupno</TableHead>
                      <TableHead>Ukloni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="flex justify-start items-center space-x-4">
                          {item.images && item.images.length > 0 ? (
                            <Image
                              src={item.images[0].url}
                              alt={item.title}
                              width={60}
                              height={60}
                            />
                          ) : (
                            <span>Nema slike</span>
                          )}
                          <div>
                            <p className="font-semibold">{item.brand?.label}</p>
                            <p className="line-clamp-3">{item.title}</p>
                          </div>
                        </TableCell>

                        <TableCell className="hidden md:block">{item.priceVariant.label}</TableCell>
                        <TableCell className="hidden md:block">
                          {item.priceVariant.price.toFixed(2)} KM
                        </TableCell>
                        <TableCell className="hidden md:block">
                          {item.discount ? item.discount : 0} %
                        </TableCell>
                        <TableCell>{item.quantity} kom</TableCell>
                        <TableCell>
                          <p className={cn("", item.discount && item.discount > 0 && "text-red-500 line-through")}>{(item.priceVariant.price * item.quantity).toFixed(2)}KM</p>
                          {item.discount && item.discount > 0 ? (<p>{((item.priceVariant.price * item.quantity) * (100 - (item.discount ?? 0)) / 100).toFixed(2)}KM</p>) : ""}
                        </TableCell>
                        <TableCell>
                          <Trash2
                            className="cursor-pointer hover:text-red-400 transition"
                            onClick={() => cart.removeItem(item.id, toast)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {cart.items.length > 0 && (

              <div className="w-full md:pt-8">
                <div className="w-full flex justify-center md:justify-start items-center gap-2 py-2.5 border-b">
                  <Image src="/icons/shipping.svg" alt="ship" width={28} height={28} />
                  <h1 className="text-md sm:text-2xl font-medium">Dostava</h1>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 max-xl:p-2">
                  <div className="flex flex-col space-y-4">
                  <FormField 
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem className="max-w-md">
                        <FormLabel>Ime i prezime</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Unesite ime i prezime"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                      <FormItem className="max-w-md">
                        <FormLabel>Broj telefona</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            type="tel"
                            placeholder="Unesite broj telefona"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="address"
                    render={({field}) => (
                      <FormItem className="max-w-md">
                        <FormLabel>Adresa</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Unesite adresu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="town"
                    render={({field}) => (
                      <FormItem className="max-w-md">
                        <FormLabel>Grad</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Unesite grad"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="postal"
                    render={({field}) => (
                      <FormItem className="max-w-md">
                        <FormLabel>Poštanski broj</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            type="number"
                            placeholder="Unesite poštanski broj"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Način plaćanja</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="pouzecem" />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center items-center gap-2">
                                  Pouzećem
                                  <Truck size={50} />
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="karticom" />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center items-center">
                                  Kartično plaćanje
                                  <div className="flex gap-2">
                                    <Image src="/visa.png" alt="visa" width={50} height={30} />
                                    <Image src="/mastercard.png" alt="mastercard" width={50} height={30} />
                                  </div>
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator className="my-4 w-full hidden sm:block" />
                    <h1 className="text-2xl hidden sm:block">Besplatna dostava za narudžbe iznad 100 KM</h1>
                    <Image src="/dostava.png" alt="dostava" width={500} height={300} className="w-1/2 hidden sm:flex justify-center items-center" />
                  </div>
                </div>
              </div>
              )}
            </div>

            {cart.items.length > 0 && (
              <div className="md:sticky top-0 w-full lg:w-1/3 max-lg:px-2 lg:pl-6 flex flex-col justify-start items-start">
                <div className="w-full flex justify-center items-center gap-2 py-2.5 border-b">
                  <Image
                    src="/icons/payment.svg"
                    alt="orders"
                    width={24}
                    height={24}
                  />
                  <h1 className="text-md sm:text-2xl font-medium">Narudžba</h1>
                </div>
                <div className="w-full grid grid-cols-2 py-4 gap-y-6 text-md">
                  <h1>Cijena bez popusta:</h1>
                  <p className="text-end">{totalAmount.toFixed(2)} KM</p>
                  <h1>Popust:</h1>
                  <p className="text-end">{totalDiscount.toFixed(2)} KM</p>
                  <h1 className="font-bold">Iznos s popustom:</h1>
                  <p className="text-end font-bold">{totalPriceWithDiscount.toFixed(2)} KM</p>
                </div>
                <Separator />
                <div className="w-full grid grid-cols-2 py-4 gap-y-6 text-md">
                  <h1>Dostava:</h1>
                  <p className="text-end">{totalPriceWithDiscount > 100 ? 'besplatna' : '10 KM'}</p>
                  <h1 className="font-bold">Iznos s PDV-om:</h1>
                  <p className="text-end font-bold">{totalPriceWithDiscount > 100 ? (totalPriceWithDiscount * 1.17).toFixed(2) : (totalPriceWithDelivery * 1.17).toFixed(2)} KM</p>
                </div>   
                <Button size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting && <Loader2 size={24} className="animate-spin mr-2" />}
                  Pošalji narudžbu  
                </Button>             
              </div>
            )}
          </div>  
        </div>
      </form>
    </Form>
  );
};

export default CartPage;

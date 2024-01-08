"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalendarHeart, Package, User, WalletCards } from "lucide-react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { Address, Brand, Category, Image as Images, Order, OrderItem, PriceVariant, Product, Wishlist } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { useRouter, useSearchParams } from 'next/navigation'
import ParfemCard from "./parfemi/ParfemCard";

type AccountProps = {
  kupljeniArtikli: (OrderItem & { order: Order })[]
  narudzbe: (Order & { orderItems: OrderItem[], address: Address })[]
  wishlist: (Wishlist & { product: Product & { images: Images[], category: Category | null, brand: Brand | null, priceVariants: PriceVariant[] } })[] 
};

const AccountTabs = ({ kupljeniArtikli, narudzbe, wishlist }: AccountProps) => {
  const { user } = useUser();
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get('tab') || 'osobne'

  const handleTabClick = (tabName: string) => {
    router.push(`?tab=${tabName}`)
  }
  

  return (
    <div className="h-full px-1 xl:px-0 py-4 md:py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-semibold">Moj račun</h1>
        <div className="flex items-center justify-center gap-3">
          {user?.hasImage ? (
            <Image src={user.imageUrl} alt="userimage" width={40} height={40} />
          ) : (
            <Image
              src="/icons/profile.svg"
              alt="profile"
              width={40}
              height={40}
            />
          )}
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{user?.fullName}</p>
            <p className="text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <Tabs defaultValue={activeTab} className="flex flex-col lg:flex-row lg:py-2 lg:gap-10">
        <TabsList className="flex">
          <TabsTrigger value="osobne" onClick={() => handleTabClick('osobne')}>
            <User size={28} className="mr-2" /> Osobne informacije
          </TabsTrigger>
          <TabsTrigger value="kupovine" onClick={() => handleTabClick('kupovine')}>
            <WalletCards size={28} className="mr-2" /> Kupljeni Artikli
          </TabsTrigger>
          <TabsTrigger value="narudžbe" onClick={() => handleTabClick('narudžbe')}>
            <Package size={28} className="mr-2" /> Moje narudžbe
          </TabsTrigger>
          <TabsTrigger value="zelje" onClick={() => handleTabClick('zelje')}>
            <CalendarHeart size={28} className="mr-2" /> Lista Želja
          </TabsTrigger>
        </TabsList>

        <TabsContent value="osobne" className="w-full space-y-2">
          <h1>Osobne informacije:</h1>
          <UserProfile             
            appearance={{
              elements: {
                card: "shadow-none rounded-md border-gray-300",
                profilePage__security: "hidden",
                navbar: "hidden",
                profileSection__emailAddresses: "hidden",
                profileSection__connectedAccounts: "hidden",
                navbarMobileMenuButton: "hidden",
                pageScrollBox: "max-sm:pt-0.5",
                headerTitle: "text-xl",
                page: "min-h-full",
              }
            }}
          >

              <UserProfile.Page label="Testing" />
          </UserProfile>
        </TabsContent>

        <TabsContent value="kupovine" className="w-full space-y-2">
          <h1>Moja kupovina:</h1>
          <Separator />
          <ScrollArea>
          {kupljeniArtikli && kupljeniArtikli.length > 0 ? (
            kupljeniArtikli?.map((item) => (
              <Link
                href={`/parfemi/${item.category.replace(
                  /\s/g,
                  "-"
                )}/${item.title
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
                key={item.id}
                className="flex w-full border-b py-1"
              >
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt="productImage"
                    width={100}
                    height={100}
                    className="aspect-square object-contain lg:object-cover"
                  />
                )}
                <div className="flex flex-col lg:grid grid-cols-3 w-full text-center items-start lg:items-center max-xl:text-sm">
                  <div className="flex lg:hidden font-semibold">
                    {item.title} | {item.measure} | {item.brand}
                  </div>
                  <h1 className="hidden lg:block text-start font-semibold">{item.title}</h1>
                  <h1 className="hidden lg:block text-center font-semibold">{item.measure}</h1>
                  <h1 className="hidden lg:block text-end font-semibold">{item.brand}</h1>
                  <div className="text-start">
                    {item.discount && item.discount > 0 ? (
                      <>
                        <div className="flex gap-2">
                          <h1>Popust: {item.discount}%</h1>             
                          <h1 className="text-red-500 line-through">Cijena: {item.price.toFixed(2)} KM</h1>
                        </div>
                        <h1>Cijena s popustom: {(item.price * (100 - (item.discount ?? 0)) / 100).toFixed(2)} KM</h1>
                      </>
                    ) : (
                      <h1>Cijena: {item.price.toFixed(2)} KM</h1>
                    )}
                  </div>
                  <div className="flex lg:hidden">
                    Količina: {item.quantity} kom | {item.discount && item.discount > 0 ? (
                      <h1>Ukupno: {((item.price * item.quantity) * (100 - (item.discount ?? 0)) / 100).toFixed(2)} KM</h1>
                    ) : (
                      <h1>Ukupno: {item.price && (item.price * item.quantity).toFixed(2)}{" "}KM</h1>
                    )}
                  </div>
                  <h1 className="hidden lg:block text-center">{item.quantity} kom</h1>
                  <h1 className="hidden lg:block text-end">
                    {item.discount && item.discount > 0 ? (
                      <h1>Ukupno: {((item.price * item.quantity) * (100 - (item.discount ?? 0)) / 100).toFixed(2)} KM</h1>
                    ) : (
                      <h1>Ukupno: {item.price && (item.price * item.quantity).toFixed(2)}{" "}KM</h1>
                    )}
                  </h1>
                  <h1 className="text-start">Narudžba napravljena: {format(item.order.createdAt, "dd.MM.yyyy", { locale: hr })} </h1>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-52 lg:h-64 gap-4">
              <h1 className="font-bold text-xl md:text-3xl">Zasada niste kupili nijedan artikal.</h1>
              <Link
                href="/parfemi"
                className="underline underline-offset-2 text-primary hover:text-primary/60 text-md md:text-xl"
              >
                Pregledajte top proizvode iz našeg asortimana
              </Link>
            </div>
          )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="narudžbe" className="w-full space-y-2">
          <h1>Narudžbe:</h1>
          <Separator />
          {narudzbe && narudzbe.length > 0 ? (
            narudzbe.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div className="group flex flex-col cursor-pointer hover:bg-primary-foreground transition border-b max-lg:text-sm">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold">Narudžba broj: {item.id}</h1>
                      <Badge variant="outline" className="group-hover:bg-primary group-hover:text-white text-center">Pregledajte narudžbu</Badge>
                    </div>
                    <h1>
                      Ukupan iznos:{" "}
                      {item.orderItems.reduce(
                        (total, orderItem) =>
                          total +
                          (orderItem.price * orderItem.quantity * (100 - (orderItem.discount ?? 0))) /
                            100,
                        0
                      ).toFixed(2)}{" "}
                      KM + PDV
                    </h1>
                    <h1>Datum narudžbe: {format(item.createdAt, "dd.MM.yyyy", { locale: hr })}</h1>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogTitle className="text-base md:text-xl">
                    Broj narudžbe: {item.id}
                  </DialogTitle>
                  <Separator className="my-2" />
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="text-xs md:text-lg">
                        <h1 className="capitalize">Plaćanje: {item.payment === 'pouzecem' ? 'Pouzećem' : 'Kartično'}</h1>
                        <h1> Datum narudžbe: {format(item.createdAt, "dd.MM.yyyy", { locale: hr })}</h1>
                        <h1 className="font-semibold">
                          Ukupan iznos:{" "}
                          {item.orderItems.reduce(
                            (total, orderItem) =>
                              total +
                              (orderItem.price * orderItem.quantity * (100 - (orderItem.discount ?? 0))) /
                                100,
                            0
                          ).toFixed(2)}{" "}
                          KM + PDV
                        </h1>
                      </div>

                      <div className="text-xs md:text-sm">
                        <h1 className="capitalize">Ime: {item.address.name}</h1>
                        <h1>Adresa: {item.address.address}</h1>
                        <h1>Telefon: {item.address.phone}</h1>
                        <h1>Poštanski broj: {item.address.postal}</h1>
                        <h1>Grad: {item.address.town}</h1>
                      </div>
                    </div>
                    <Separator className="my-2" />
                    {item.orderItems.map((item) => (
                      <div key={item.id} className="flex w-full border-b py-1">
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt="productImage"
                            width={100}
                            height={100}
                            className="aspect-square object-contain lg:object-cover"
                          />
                        )}
                        <div className="flex flex-col justify-around w-full text-sm md:text-base">
                          <div className="flex font-semibold">
                            {item.title} | {item.measure} | {item.brand}
                          </div>
                          {item.discount && item.discount > 0 ? (
                            <>
                              <div className="flex justify-between gap-2">
                                <h1>Popust: {item.discount}%</h1>             
                                <h1 className="text-red-500 line-through">Cijena: {item.price.toFixed(2)} KM</h1>
                              </div>
                              <div className="flex justify-end gap-1">
                                <h1>Cijena s popustom:</h1>
                                <h1>{(item.price * (100 - (item.discount ?? 0)) / 100).toFixed(2)} KM</h1>
                              </div>
                            </>
                          ) : (
                            <h1>Cijena: {item.price.toFixed(2)} KM</h1>
                          )}
                          <div className="flex justify-between items-center">
                            <h1>{item.quantity} kom</h1>
                            <h1>
                              {item.discount && item.discount > 0 ? (
                                <h1>Ukupno: {((item.price * item.quantity) * (100 - (item.discount ?? 0)) / 100).toFixed(2)} KM</h1>
                              ) : (
                                <h1>Ukupno: {item.price && (item.price * item.quantity).toFixed(2)}{" "}KM</h1>
                              )}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-52 lg:h-64 gap-4">
              <h1 className="font-bold text-xl md:text-3xl">Niste plasirali nijednu narudžbu.</h1>
              <Link
                href="/parfemi"
                className="underline underline-offset-2 text-primary hover:text-primary/60 text-md md:text-xl"
              >
                Pregledajte top proizvode iz našeg asortimana
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="zelje" className="w-full space-y-2">
          <h1>Lista želja</h1>
          <Separator />
          {wishlist && wishlist.length > 0 ? (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
              {wishlist.map((item) => (
                <div key={item.id} >
                  <ParfemCard parfem={item.product} />
                </div>
              ))}
            </div>
          ) : (
            <h1 className="flex justify-center items-center h-52 lg:h-72   font-bold text-xl md:text-3xl">Nemate nijedan artikal u listi želja.</h1>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;

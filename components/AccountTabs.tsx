"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalendarHeart, Package, User, WalletCards } from "lucide-react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { Address, Order, OrderItem } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type AccountProps = {
  kupljeniArtikli: (OrderItem & { order: Order })[]
  narudzbe: (Order & { orderItems: OrderItem[], address: Address })[]
};

const AccountTabs = ({ kupljeniArtikli, narudzbe }: AccountProps) => {
  const { user } = useUser();

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
      <Tabs defaultValue="osobne" className="flex flex-col lg:flex-row lg:py-2 lg:gap-10">
        <TabsList className="flex">
          <TabsTrigger value="osobne">
            <User size={28} className="mr-2" /> Osobne informacije
          </TabsTrigger>
          <TabsTrigger value="kupovine">
            <WalletCards size={28} className="mr-2" /> Kupljeni Artikli
          </TabsTrigger>
          <TabsTrigger value="narudžbe">
            <Package size={28} className="mr-2" /> Moje narudžbe
          </TabsTrigger>
          <TabsTrigger value="zelje">
            <CalendarHeart size={28} className="mr-2" /> Lista Želja
          </TabsTrigger>
        </TabsList>

        <TabsContent value="osobne">
          <h1>Osobne informacije:</h1>
          <UserProfile             
            appearance={{
              elements: {
                card: "shadow-none rounded-md border-gray-300",
                profilePage__security: "hidden",
                navbar: "hidden",
                profileSection__emailAddresses: "hidden",
                profileSection__connectedAccounts: "hidden",
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
          {kupljeniArtikli?.map((item) => (
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
          ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="narudžbe" className="w-full space-y-2">
          <h1>Narudžbe:</h1>
          <Separator />
          {narudzbe ? (
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
                  <DialogTitle className="text-xl">
                    Broj narudžbe: {item.id}
                  </DialogTitle>
                  <Separator className="my-2" />
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="capitalize text-lg">Plaćanje: {item.payment}</h1>
                        <h1 className="text-lg">Datum narudžbe: {format(item.createdAt, "dd.MM.yyyy", { locale: hr })}</h1>
                        <h1 className="font-semibold text-lg">
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

                      <div>
                        <h1 className="capitalize text-sm">Ime: {item.address.name}</h1>
                        <h1 className="text-sm">Adresa: {item.address.address}</h1>
                        <h1 className="text-sm">Telefon: {item.address.phone}</h1>
                        <h1 className="text-sm">Poštanski broj: {item.address.postal}</h1>
                        <h1 className="text-sm">Grad: {item.address.town}</h1>
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
                        <div className="flex flex-col w-full text-sm md:text-base">
                          <div className="flex font-semibold">
                            {item.title} | {item.measure} | {item.brand}
                          </div>
                          {item.discount && item.discount > 0 ? (
                            <>
                              <div className="flex justify-between gap-2">
                                <h1>Popust: {item.discount}%</h1>             
                                <h1 className="text-red-500 line-through">Cijena: {item.price.toFixed(2)} KM</h1>
                              </div>
                              <div className="flex justify-between gap-2">
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
            <h1 className="flex justify-center items-center h-full font-bold text-xl md:text-3xl">Niste plasirali nijednu narudžbu</h1>
          )}
        </TabsContent>

        <TabsContent value="zelje" className="w-full space-y-2">
          <h1>Lista želja</h1>
          <Separator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;

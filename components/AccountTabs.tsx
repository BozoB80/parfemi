"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalendarHeart, Package, User, WalletCards } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { Order, OrderItem } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import { hr } from "date-fns/locale";

type AccountProps = {
  kupljeniArtikli: (OrderItem & { order: Order })[]
};

const AccountTabs = ({ kupljeniArtikli }: AccountProps) => {
  const { user } = useUser();

  return (
    <div className="h-full py-10">
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
            <p className="font-semibold">{user?.fullName}</p>
            <p>{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
      <Tabs defaultValue="osobne" className="flex py-2 gap-10">
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
          <h1>Osobne</h1>
        </TabsContent>

        <TabsContent value="kupovine" className="w-full space-y-2">
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
                  className="aspect-square object-cover"
                />
              )}
              <div className="grid grid-cols-3 w-full text-center items-center">
                <h1 className="text-start font-semibold">{item.title}</h1>
                <h1 className="text-center font-semibold">{item.measure}</h1>
                <h1 className="text-end font-semibold">{item.brand}</h1>
                <div className="text-start">
                  {item.discount && item.discount > 0 ? (
                    <>
                      <div className="flex gap-2">
                        <h1>Popust: {item.discount}%</h1>             
                        <h1 className="text-red-500 line-through">Cijena: {item.price.toFixed(2)} KM</h1>
                      </div>
                      <h1>Cijena s popustom: {((item.price * item.quantity) * (100 - (item.discount ?? 0)) / 100).toFixed(2)} KM</h1>
                    </>
                  ) : (
                    <h1>Cijena: {item.price.toFixed(2)} KM</h1>
                  )}
                </div>
                <h1 className="text-center">{item.quantity} kom</h1>
                <h1 className="text-end">
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
        </TabsContent>

        <TabsContent value="narudžbe">
          <h1>Osobne</h1>
        </TabsContent>

        <TabsContent value="zelje">
          <h1>Osobne</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountTabs;

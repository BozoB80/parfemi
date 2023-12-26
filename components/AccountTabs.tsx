"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalendarHeart, Package, User, WalletCards } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import {
  Brand,
  Category,
  Image as Images,
  OrderItem,
  PriceVariant,
  Product,
} from "@prisma/client";
import Link from "next/link";

type AccountProps = {
  kupljeniArtikli:
    | (OrderItem & {
        priceVariant?: PriceVariant & {
          Product?: Product & {
            images?: Images[];
            brand?: Brand | null; // Adjust this based on your actual data
            category?: Category | null; // Adjust this based on your actual data
          } | null;
        } | null;
      })[]
    | null;
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
              href={`/parfemi/${item.priceVariant?.Product?.category?.label.replace(
                /\s/g,
                "-"
              )}/${item.priceVariant?.Product?.title
                .toLowerCase()
                .replace(/\s/g, "-")}`}
              key={item.id}
              className="flex w-full border-b py-1"
            >
              {item.priceVariant?.Product?.images?.[0]?.url && (
                <Image
                  src={item.priceVariant.Product.images[0].url}
                  alt="productImage"
                  width={100}
                  height={100}
                  className="aspect-square object-cover"
                />
              )}
              <div className="grid grid-cols-3 w-full text-center items-center">
                <h1 className="text-start font-semibold">{item.priceVariant?.Product?.title}</h1>
                <h1 className="text-center font-semibold">{item.priceVariant?.label}</h1>
                <h1 className="text-end font-semibold">{item.priceVariant?.Product?.brand?.label}</h1>
                <h1 className="text-start">Cijena: {item.priceVariant?.price.toFixed(2)} KM</h1>
                <h1 className="text-center">{item.quantity} kom</h1>
                <h1 className="text-end">
                  Ukupno: {item.priceVariant?.price && (item.priceVariant?.price * item.quantity).toFixed(2)}{" "}
                  KM
                </h1>
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

"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";

import { sidebarLinks } from "@/constants";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="sticky left-0 top-0 h-screen z-20 md:w-fit xl:w-[300px] flex flex-col justify-between overflow-auto border-r-primary-foregroundry border-r-2 py-5 max-md:hidden">
      <Link href="/" className="lg:flex justify-center pb-5 md:hidden">
        <Image
          src={"/logo2.png"}
          alt="logo"
          width={150}
          height={150}
          className="cursor-pointer"
        />
      </Link>

      <Separator />

      <div className="flex flex-col w-full gap-2 p-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`relative flex justify-start gap-4 rounded-md p-4 hover:text-primary ${
                isActive &&
                "bg-primary text-white/90 hover:text-white/60 transition"
              }`}
            >
              <link.icon className="w-6 h-6" />
              <p className="max-lg:hidden font-medium text-lg whitespace-nowrap">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <Separator />

      <div className="px-6 pt-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <LogOut />
              <p className="font-medium text-lg max-lg:hidden">Odjava</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default Sidebar;

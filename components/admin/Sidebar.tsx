"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";

import { sidebarLinks } from "@/constants";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../ThemeToggle";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="sticky left-0 top-0 h-screen z-20 w-fit flex flex-col justify-between overflow-auto border-r-primary-foregroundry border-r-2 py-5 max-md:hidden">
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

      <div className="flex w-full flex-1 flex-col gap-2 p-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`relative flex justify-start gap-4 rounded-md p-4 hover:text-primary ${isActive && "bg-primary hover:text-white/60"}`}
            >
              <link.icon className="w-6 h-6" />
              <p className="max-lg:hidden font-medium text-lg">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <Separator />

      <div className="mt-10 px-6">
          <div className="flex justify-start items-center cursor-pointer gap-2 p-2">
          <ThemeToggle />
              <p className="font-medium text-lg max-lg:hidden">Tamna tema</p>
            </div>
        
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
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

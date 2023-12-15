import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
      <div
        className="relative bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url("/login.jpg")` }}
      >
        <Link href="/" className="absolute top-5 left-5 z-50">
          <Image
            src="/logo2.png"
            alt="logo"
            width={200}
            height={150}
            className="cursor-pointer max-sm:w-40"
          />
        </Link>
        <div className="lg:hidden h-full flex justify-center items-center">
          <SignIn />
        </div>
      </div>
      <div className="hidden lg:flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}

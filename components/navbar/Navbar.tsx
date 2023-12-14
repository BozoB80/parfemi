import Image from "next/image";
import Link from "next/link";
import MainNav from "./MainNav";
import Searchbar from "./Searchbar";
import NavRight from "./NavRight";
import MobileMenu from "./MobileMenu";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const brendovi = await prismadb.brand.findMany({
    orderBy: {
      label: "asc"
    }
  })

  const kategorije = await prismadb.category.findMany({
    orderBy: {
      label: "asc"
    }
  })

  return (
    <nav className="border-b shadow-xl">
      <div className="h-16 sm:h-24 flex justify-between items-center px-4 gap-10">
        <MobileMenu kategorije={kategorije} brendovi={brendovi} />
        <Searchbar />
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="logo"
            width={200}
            height={150}
            className="cursor-pointer max-sm:w-40"
          />
        </Link>
        <NavRight />
      </div>
      <MainNav brendovi={brendovi} />
    </nav>
  );
};

export default Navbar;

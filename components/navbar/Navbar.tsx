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
      createdAt: "asc"
    }
  })

  return (
    <nav className="shadow-xl">
      <div className="h-16 sm:h-24 flex justify-between items-center px-4 gap-10">
        <MobileMenu kategorije={kategorije} brendovi={brendovi} />
        <Searchbar />
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="logo"
            width={500}
            height={350}
            className="h-14 object-contain cursor-pointer"
          />
        </Link>
        <NavRight />
      </div>
      <div className="bg-primary">
        <MainNav brendovi={brendovi} kategorije={kategorije} />
      </div>
    </nav>
  );
};

export default Navbar;

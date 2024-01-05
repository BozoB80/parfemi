import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

interface BrandProps {
  params: {
    brendName: string
  }
}

const BrendNamePage = async ({ params }: BrandProps) => {
  const decodedBrandName = params.brendName.replace(/%26/g, '&');

  const parfemi = await prismadb.product.findMany({
    where: {
      brand: {
        label: {
          contains: decodedBrandName.replace(/-/g, ' '),
          mode: "insensitive"
        }
      }
    },
    include: {
      brand: true,
      category: true,
      images: true,
      priceVariants: true,
      wishlist: true
    }
  })  

  const brend = await prismadb.brand.findFirst({
    where: {
      label: {
        contains: decodedBrandName.replace(/-/g, ' '),
        mode: "insensitive"
      }
    }
  })

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumbs page="brend" params={params.brendName} />
      <div className="grid grid-cols-1 sm:grid-cols-2 py-2 sm:py-8">
        <div className="flex justify-center items-center border-r">
          <Image 
            src={brend?.logo || ""}
            alt="logo"
            width={200}
            height={100}
          />
        </div>
        <div className="px-4">
          <h1>{brend?.description}</h1>
        </div>
      </div>
      <Separator className="mb-2 sm:mb-6" />
      <ParfemiList parfemi={parfemi} />
    </div>
  );
}

export default BrendNamePage;
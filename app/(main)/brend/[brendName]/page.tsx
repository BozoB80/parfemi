import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

interface BrandProps {
  params: {
    brendName: string
  }
}

const BrendNamePage = async ({ params }: BrandProps) => {
  const parfemi = await prismadb.product.findMany({
    where: {
      brand: {
        label: {
          contains: params.brendName,
          mode: "insensitive"
        }
      }
    },
    include: {
      brand: true,
      category: true,
      images: true,
      priceVariants: true
    }
  })
  
  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumbs page="brend" params={params.brendName} />
      <ParfemiList parfemi={parfemi} />
    </div>
  );
}

export default BrendNamePage;
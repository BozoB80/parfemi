import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params: {
    categoryName: string
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const parfemi = await prismadb.product.findMany({
    where: {
      category: {
        label: params.categoryName.replace(/-/g, ' ')
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
      <BreadCrumbs page="parfemi" params={`${params.categoryName}`} />
      <ParfemiList parfemi={parfemi} />
    </div>
  );
}

export default CategoryPage;
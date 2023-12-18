import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemDetails from "@/components/parfemi/ParfemDetails";
import prismadb from "@/lib/prismadb";

interface ParfemNameProps {
  params: {
    parfemName: string
    categoryName: string
  }
}

const ParfemNamePage = async ({ params }: ParfemNameProps) => {
  const formattedParfemName = decodeURIComponent(params.parfemName.replace(/-/g, ' '));

  const parfem = await prismadb.product.findFirst({
    where: {
      title: {
        contains: formattedParfemName,
        mode: "insensitive"
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
      <BreadCrumbs page="parfemi" params={`${params.categoryName}`} params2={`${formattedParfemName}`} />
      <ParfemDetails parfem={parfem} />
    </div>
  );
}

export default ParfemNamePage;
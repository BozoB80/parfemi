import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemDetails from "@/components/parfemi/ParfemDetails";
import prismadb from "@/lib/prismadb";

interface ParfemNameProps {
  params: {
    parfemName: string
  }
}

const ParfemNamePage = async ({ params }: ParfemNameProps) => {
  const formattedParfemName = params.parfemName.replace(/-/g, ' ')

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
      <BreadCrumbs page="parfemi" params={`${parfem?.category?.label}`} params2={`${params.parfemName}`} />
      <ParfemDetails parfem={parfem} />
    </div>
  );
}

export default ParfemNamePage;
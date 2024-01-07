import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

const ParfemiPage = async () => {
  const parfemi = await prismadb.product.findMany({
    include: {
      brand: true,
      category: true,
      images: true,
      priceVariants: true,
      wishlist: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    
  })

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumbs page="parfemi" />
      <ParfemiList parfemi={parfemi} />
    </div>
  );
}

export default ParfemiPage;
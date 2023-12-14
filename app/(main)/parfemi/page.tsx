import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

const ParfemiPage = async () => {
  const parfemi = await prismadb.product.findMany({
    include: {
      brand: true,
      category: true,
      images: true,
      priceVariants: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  return (
    <div className="h-full max-w-7xl mx-auto">
      <ParfemiList parfemi={parfemi} />
    </div>
  );
}

export default ParfemiPage;
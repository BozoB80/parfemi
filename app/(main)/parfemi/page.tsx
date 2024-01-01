import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

const ParfemiPage = async ({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined }}) => {
  const page = searchParams['page'] ?? '1'
  const perPage = searchParams['perPage'] ?? '12'

  const start = (Number(page) - 1) * Number(perPage)
  const end = start + Number(perPage)

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
  
  const entries = parfemi.slice(start, end)

  const totalAmount = parfemi.length

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumbs page="parfemi" />
      <ParfemiList parfemi={entries} totalAmount={totalAmount} hasNextPage={end < parfemi.length} hasPrevPage={start > 0} />
    </div>
  );
}

export default ParfemiPage;
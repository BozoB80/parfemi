import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params: {
    categoryName: string
  }
  searchParams: {[key: string]: string | string[] | undefined }
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const page = searchParams['page'] ?? '1'
  const perPage = searchParams['perPage'] ?? '12'

  const start = (Number(page) - 1) * Number(perPage)
  const end = start + Number(perPage)

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

  const entries = parfemi.slice(start, end)

  const totalAmount = parfemi.length

  return (
    <div className="max-w-7xl mx-auto">
      <BreadCrumbs page="parfemi" params={`${params.categoryName}`} />
      <ParfemiList parfemi={entries} totalAmount={totalAmount} hasNextPage={end < parfemi.length} hasPrevPage={start > 0} />
    </div>
  );
}

export default CategoryPage;
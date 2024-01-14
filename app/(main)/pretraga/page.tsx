import BreadCrumbs from "@/components/Breadcrumbs";
import ParfemiList from "@/components/parfemi/ParfemiList";
import prismadb from "@/lib/prismadb";

const PretragaPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => { 
  
  const searchString = Array.isArray(searchParams.q) ? searchParams.q.join(" ") : searchParams.q || "";

  const searchResults = await prismadb.product.findMany({
    where: {
      OR: [
        {
          description: {
            contains: searchString,
            mode: "insensitive"
          },  
        },
        {
          brand: {
            label: {
              contains: searchString,
              mode: "insensitive"
            }
          }
        }
      ],         
    },
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
      <ParfemiList parfemi={searchResults} />
    </div>
  );
}

export default PretragaPage;
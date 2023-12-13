import prismadb from "@/lib/prismadb";
import ProductForm from "./_components/ProductForm";

const ProductIdPage = async ({ params }: { params: { proizvodId: string }}) => {

  let product = null
  
  if (params.proizvodId !== "new") {
    product = await prismadb.product.findUnique({
      where: {
        id: params.proizvodId
      },
      include: {
        images: true,
        brand: true,
        category: true,
        sizes: true
      }
    })
  } 

  const categories = await prismadb.category.findMany()
  const brands = await prismadb.brand.findMany()
  const sizes = await prismadb.size.findMany()

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          initialData={product}
          categories={categories}
          brands={brands}
          sizes={sizes}
        />
      </div>      
    </div>
  );
}

export default ProductIdPage;
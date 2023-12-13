import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import ProductClient from "./components/client";

const ProductPage = async () => {
  const product = await prismadb.product.findMany({
    include: {
      brand: true,
      category: true,
      images: true,
      sizes: {
        include: {
          price: true
        }
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  const formattedProduct: ProductColumn[] = product.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.sizes.map((item) => item.price.value),
    discount: item.discount || 0,
    rating: item.rating || 0,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-1 flex-col">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <ProductClient data={formattedProduct} />
      </div>
    </div>
  );
}

export default ProductPage;